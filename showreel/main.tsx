import { useEffect, useState, type CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import '../src/styles/main.scss';
import { Camera, Files, Gallery, Goal, Intro, Multitasking, Outro, Shade, Wallpapers, Weather } from './scenes';
import './film.scss';

const shots = [
  { id: 'opening', duration: 3100, Scene: Intro },
  { id: 'shade', duration: 4400, Scene: Shade, title: 'Пункт управления', detail: 'control center' },
  { id: 'weather', duration: 4200, Scene: Weather, title: 'Погода', detail: 'weather forecast' },
  { id: 'recents', duration: 5600, Scene: Multitasking, title: 'Многозадачность', detail: 'recent apps' },
  { id: 'camera', duration: 4100, Scene: Camera, title: 'Камера', detail: 'viewfinder' },
  { id: 'gallery', duration: 5400, Scene: Gallery, title: 'Галерея', detail: 'photo albums' },
  { id: 'files', duration: 8500, Scene: Files, title: 'Файлы', detail: 'batch move' },
  { id: 'goal', duration: 6500, Scene: Goal, title: 'Напоминания', detail: 'daily goal' },
  { id: 'wallpapers', duration: 7400, Scene: Wallpapers, title: 'Обои', detail: 'wallpaper carousel' },
  { id: 'closing', duration: 3900, Scene: Outro },
];

function scaleToWindow() {
  return Math.min(innerWidth / 1600, innerHeight / 900);
}

function chapterFromUrl() {
  return Math.max(0, shots.findIndex(shot => shot.id === location.hash.slice(1)));
}

function Film() {
  const [index, setIndex] = useState(chapterFromUrl);
  const [scale, setScale] = useState(scaleToWindow);
  const { id, duration, Scene, title, detail } = shots[index];
  useEffect(() => {
    const timer = setTimeout(() => setIndex(i => (i + 1) % shots.length), duration);
    return () => clearTimeout(timer);
  }, [index, duration]);
  useEffect(() => {
    const resize = () => setScale(scaleToWindow());
    const jumpToChapter = () => setIndex(chapterFromUrl());
    window.addEventListener('resize', resize);
    window.addEventListener('hashchange', jumpToChapter);
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('hashchange', jumpToChapter);
    };
  }, []);
  return <main aria-label="Mobile UI 2026. Динамическая демонстрация мобильного интерфейса DRO">
    <div className={'film ' + id} style={{'--fit':scale, '--shot-time': duration + 'ms'} as CSSProperties}>
      <div className="grid" aria-hidden="true">{Array.from({length:24}, (_,i) => <i key={i} style={{left: (i%6)*20+'%', top: Math.floor(i/6)*100/3+'%'}}/>)}</div>
      <div key={id} className="shot" ref={node => node?.setAttribute('inert','')}><Scene/></div>
      {id !== 'closing' && <div className="office">DRO_<small>design &amp; research<br/>office</small></div>}
      <time className="dateline" dateTime="2026-11-12">12.11_26</time>
      {title && <div key={title} className="caption"><small>0{index}.</small><h2>{title}_</h2><small>{detail}</small></div>}
    </div>
  </main>;
}

createRoot(document.getElementById('root')!).render(<Film/>);
