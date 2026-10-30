import { test } from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { build } from 'esbuild';
const result = await build({entryPoints:['src/web/Notes/gigaam-local.ts'], bundle:true,write:false,format:'esm',platform:'node'});
const {GigaamRecording} = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString('base64')}`);
const tick = () => new Promise(resolve=>setImmediate(resolve));
function setup(getMedia) {
  let released=false;
  const phases=[], texts=[], previews=[], errors=[];
  globalThis.location={hostname:'localhost',host:'localhost:8765',protocol:'http:'};
  globalThis.document={baseURI:'http://localhost:8765/'};
  globalThis.fetch=async()=>({json:async()=>({engine:'gigaam',transport:'websocket',status:'ready'})});
  const stream={getTracks:()=>[{stop(){released=true}}]};
  Object.defineProperty(globalThis,'navigator',{configurable:true,value:{mediaDevices:{getUserMedia:getMedia|| (async()=>stream)}}});
  const node={connect(){},disconnect(){},port:{onmessage:null,postMessage(message){
    if(message==='flush') this.onmessage?.({data:'flushed'});
  }}};
  globalThis.AudioContext=class {
    state='running'; destination={}; audioWorklet={async addModule(){}};
    async resume(){} async close(){this.state='closed'}
    createMediaStreamSource(){return {connect(){},disconnect(){}}}
  };
  globalThis.AudioWorkletNode=class {constructor(){return node}};
  let socket;
  globalThis.WebSocket=class {
    static OPEN=1; readyState=1; bufferedAmount=0; sent=[];
    constructor(){socket=this;setImmediate(()=>this.emit({type:'ready'}))}
    emit(value){this.onmessage?.({data:JSON.stringify(value)})}
    send(data){this.sent.push(data)} close(){this.readyState=3;this.onclose?.()}
  };
  const recording=new GigaamRecording({onPhase:p=>phases.push(p),onPartial:t=>previews.push(t),onText:t=>texts.push(t),onError:e=>errors.push(e)});
  return {recording,phases,texts,previews,errors,node,stream,socket:()=>socket,released:()=>released};
}
test('partial then corrected final; only binary PCM to local socket',async()=>{
  const s=setup();await s.recording.start();
  s.node.port.onmessage({data:new ArrayBuffer(4096)});
  s.socket().emit({type:'partial',text:'Привет'});
  assert.deepEqual(s.previews,['Привет']); assert.deepEqual(s.texts,[]);
  await s.recording.stop();assert.ok(s.released());
  assert.equal(JSON.parse(s.socket().sent.at(-1)).type,'stop');
  s.socket().emit({type:'done',text:'Привет, мир!'});
  assert.deepEqual(s.texts,['Привет, мир!']);assert.deepEqual(s.errors,[]);
});
test('delete/cancel ignores every late partial and final',async()=>{
  const s=setup();await s.recording.start();s.recording.cancel();
  s.socket().emit({type:'partial',text:'Вернуть'});s.socket().emit({type:'done',text:'Вернуть'});
  assert.deepEqual(s.texts,[]);assert.deepEqual(s.previews,[]);assert.ok(s.released());
});
test('permission result after cancellation releases microphone',async()=>{
  let grant;
  const s=setup(()=>new Promise(resolve=>{grant=resolve}));
  const start=s.recording.start();while(!grant)await tick();
  s.recording.cancel();grant(s.stream);await start;assert.ok(s.released());
});
test('bounded backlog stops recording and reports error',async()=>{
  const s=setup();await s.recording.start();
  for(let i=0;i<24;i++)s.node.port.onmessage?.({data:new ArrayBuffer(4096)});
  assert.ok(s.released());assert.match(s.errors[0],/не успевает/);
});
test('connection loss preserves already emitted partial; no false done',async()=>{
  const s=setup();await s.recording.start();s.socket().emit({type:'partial',text:'Сохранить'});s.socket().close();
  assert.deepEqual(s.previews,['Сохранить']);assert.deepEqual(s.texts,[]);assert.equal(s.errors.length,1);assert.ok(s.released());
});
test('AudioWorklet preserves sample count across blocks and flushes last word',()=>{
  for(const rate of [16000,44100,48000]){
    let Processor;const messages=[];
    class Base{port={postMessage:x=>messages.push(x)}}
    const ctx={AudioWorkletProcessor:Base,sampleRate:rate,registerProcessor:(_,p)=>{Processor=p}};
    vm.runInNewContext(readFileSync('public/notes-pcm-worklet.js','utf8'),ctx);
    const p=new Processor();const samples=rate+17;
    for(let i=0;i<samples;i+=128)p.process([[new Float32Array(Math.min(128,samples-i)).fill(.5)]]);
    p.port.onmessage({data:'flush'});
    assert.equal(messages.at(-1),'flushed');
    const buffers=messages.filter(x=>x!=='flushed');
    const count=buffers.reduce((n,b)=>n+b.byteLength/2,0);
    assert.ok(Math.abs(count-Math.ceil(samples*16000/rate))<=1,`${rate}: ${count}`);
    assert.equal(new Int16Array(buffers[0])[0],16384);
  }
});
