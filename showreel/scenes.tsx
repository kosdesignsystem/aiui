import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AlbumsScreen } from '../src/web/Gallery3/albums';
import { DAILY_GOAL_DEFAULT } from '../src/web/Reminders/progress';
import { HomeGrid, LauncherStatus } from '../src/web/MyPhone/chrome';
import { ControlShade } from '../src/web/MyPhone/shade';
import { RecentApps } from '../src/web/MyPhone/recents';
import { recentApps } from '../src/web/MyPhone/model';
import { GoalSetupModal } from '../src/web/Reminders/modals';
import '../src/web/MyPhone/launcher.scss';
import '../src/web/Reminders/screen.scss';
import wallpaper from '../src/assets/launcher/wallpaper.png';
import ocean from '../src/assets/gallery/photo-81.jpg';
import desert from '../src/assets/gallery/photo-36.jpg';
import blossom from '../src/assets/gallery/photo-79.jpg';
import aurora from '../src/assets/gallery/photo-90.jpg';
import mountain from '../src/assets/gallery/photo-37.jpg';
import emblem from './assets/title-emblem.png';
import filesMove from './assets/files-move.mp4';
import filesPoster from './assets/files-move.jpg';

const noop = () => {};
const weather = recentApps.find(app => app.id === 'weather')!;
const camera = recentApps.find(app => app.id === 'camera')!;
const papers = [wallpaper, ocean, desert, blossom, aurora, mountain];

function useCues(actions: [number, () => void][]) {
  useEffect(() => {
    const timers = actions.map(([time, action]) => window.setTimeout(action, time));
    return () => timers.forEach(clearTimeout);
  }, []); // Each shot is mounted anew when its timecode is reached.
}

export function Intro() {
  return <><div className="spectrum"/><img className="emblem" src={emblem} alt=""/>
    <h1 className="film-title">Mobile UI_</h1><span className="edition">2026</span>
    <p className="credit">Команда_<br/>DRO Mobile<br/>UI / UX / Motion</p></>;
}

export function Outro() {
  return <div className="end-card">
    <div className="end-signature">
      <h2>DRO<span>_</span></h2>
      <p>design &amp; research<br/>office</p>
    </div>
    <div className="end-footer"><span>Mobile UI_</span><span>2026</span></div>
  </div>;
}

function Phone({ children, darkStatus = false, className = '' }: { children: ReactNode; darkStatus?: boolean; className?: string }) {
  return <div className={('device ' + className).trim()}><div className="surface launcher-screen">
    {children}<LauncherStatus dark={darkStatus}/><i className="lens"/><i className="home-ring"/>
  </div></div>;
}

function ForecastScreen() {
  return <img className="preview-img" src={weather.preview} alt="Прогноз погоды в Москве"/>;
}

export function Shade() {
  const ref = useRef<HTMLDivElement>(null);
  const toggle = (n: number) => ref.current?.querySelectorAll<HTMLButtonElement>('.launcher-shade__quick button')[n]?.click();
  useCues([[1100, () => toggle(0)], [1850, () => toggle(3)], [2550, () => toggle(2)]]);
  return <div ref={ref} className="weather-handoff">
    <div className="forecast-glow" aria-hidden="true"/>
    <Phone className="departing-phone"><div className="launcher-wallpaper"/>
      <ControlShade onClose={noop} onSettings={noop}/>
    </Phone>
    <Phone className="arriving-phone"><ForecastScreen/></Phone>
  </div>;
}

export function Weather() {
  return <><div className="forecast-glow" aria-hidden="true"/><Phone>
    <ForecastScreen/>
    <div className="forecast-detail" aria-hidden="true" style={{backgroundImage: 'url("' + weather.preview + '")'}}/>
  </Phone></>;
}

export function Multitasking() {
  const ref = useRef<HTMLDivElement>(null);
  function scrollToApp(id: string) {
    const track = ref.current?.querySelector<HTMLElement>('.launcher-recents__track');
    const card = track?.querySelector<HTMLElement>('[data-recent-id="' + id + '"]');
    if (track && card) track.scrollTo({left: card.offsetLeft + (card.offsetWidth - track.clientWidth) / 2, behavior: 'smooth'});
  }
  useCues([[950, () => scrollToApp('files')], [2050, () => scrollToApp('calls')], [3250, () => scrollToApp('camera')]]);
  return <div ref={ref}><Phone><div className="launcher-wallpaper"/><RecentApps initialActiveId="weather" onOpen={noop} onEmpty={noop}/>
    <img className="fold-away" src={weather.preview} alt=""/>
    <img className="expand-camera" src={camera.preview} alt=""/>
  </Phone></div>;
}

export function Camera() {
  return <Phone><img className="preview-img" src={camera.preview} alt="Камера"/>
    <div className="exposure" style={{backgroundImage:'url("' + camera.preview + '")'}}/>
  </Phone>;
}

export function Gallery() {
  const host = useRef<HTMLDivElement>(null);
  function select(selector: string) {
    host.current?.querySelector<HTMLButtonElement>(selector)?.click();
  }
  useCues([
    [850, () => select('.gallery3-album-card:nth-child(2)')],
    [1800, () => select('.gallery3-album-card.is-active')],
    [2850, () => select('.gallery-screen__thumb:nth-child(10)')],
    [4100, () => select('.gallery3-leading__close')],
  ]);
  return <div ref={host}><Phone><MemoryRouter><AlbumsScreen/></MemoryRouter></Phone></div>;
}

export function Files() {
  return <div className="device">
    <video className="surface files-recording" src={filesMove} poster={filesPoster}
      autoPlay muted playsInline aria-label="Три выбранных файла перемещаются в папку «Загрузки»"/>
  </div>;
}

const weekdays = [0, 1, 2, 3, 4];
const goalNumbers = Array.from({ length: DAILY_GOAL_DEFAULT }, (_, index) => index + 1);

function smoothStep(elapsed: number, start: number, duration: number) {
  const t = Math.min(1, Math.max(0, (elapsed - start) / duration));
  return t * t * (3 - 2 * t);
}

export function Goal() {
  const stage = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(1);
  const [days, setDays] = useState<number[]>([]);
  useCues(weekdays.map((_, i) => [4380 + i * 140, () => setDays(weekdays.slice(0, i + 1))]));

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      stage.current?.style.setProperty('--dial', '12');
      setValue(12);
      return;
    }
    const start = performance.now();
    let frame: number;
    let lastValue = 1;
    function drag(now: number) {
      const elapsed = now - start;
      // The thumb runs to the end of the rail, then eases back to twelve.
      const dial = 1 + (DAILY_GOAL_DEFAULT - 1) * smoothStep(elapsed, 1050, 2150)
        - 3 * smoothStep(elapsed, 3300, 840);
      stage.current?.style.setProperty('--dial', dial.toFixed(4));
      const next = Math.round(dial);
      if (next !== lastValue) {
        lastValue = next;
        setValue(next);
      }
      if (elapsed < 4140) frame = requestAnimationFrame(drag);
    }
    frame = requestAnimationFrame(drag);
    return () => cancelAnimationFrame(frame);
  }, []);

  return <div ref={stage} className="goal-stage">
    <div className="goal-readout" aria-hidden="true">
      <div className="goal-digits">
        <div className="goal-reel goal-tens"><span>0</span><span>1</span></div>
        <div className="goal-reel goal-ones">
          {goalNumbers.map(n => <span key={n}>{n % 10}</span>)}
        </div>
      </div>
      <div className="goal-ruler">{goalNumbers.map(n =>
        <i key={n} style={{ '--tick': n } as CSSProperties}/>
      )}</div>
      <span className="goal-unit">задач в день</span>
    </div>
    <Phone><div className="launcher-wallpaper"/><div className="goal-sheet" data-theme="light">
      <GoalSetupModal initialGoal={value} initialSelectedDays={days} onSave={noop}/>
    </div></Phone>
  </div>;
}

export function Wallpapers() {
  const [index, setIndex] = useState(0);
  useCues(papers.slice(1).map((_, i) => [900 + i * 1090, () => setIndex(i + 1)]));
  return <><div className="paper-strip">{papers.map((url, i) =>
    <img key={url} src={url} alt="" style={{'--offset':i-index} as CSSProperties}/>)}</div>
    <Phone>{papers.map((url, i) => <img key={url} src={url} className={'wall-image' + (index === i ? ' active' : '')} alt=""/>)}
    <div className="launcher-home"><HomeGrid activePage={0} dragOffset={0} isDragging={false} onLaunch={noop} onPageChange={noop}/></div>
  </Phone></>;
}
