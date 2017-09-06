import * as React from 'react';
import './App.css';

function DayLine({ day, s, e, sw }: { day: number, s: number, e: number, sw: number }) {
  const p = -Math.PI / 2 + Math.PI * 2 * day / 365;
  return (
    <line x1={Math.cos(p) * s} y1={Math.sin(p) * s} x2={Math.cos(p) * e} y2={Math.sin(p) * e}
      stroke="#000" strokeWidth={sw} />
  );
}

class App extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }
  render() {
    var now2 = new Date();
    var start = new Date(now2.getFullYear(), 0, 0);
    // tslint:disable-next-line:no-any
    var diff = (now2 as any) - (start as any);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = diff / oneDay;
    const months: number[] = Array.apply(null, {length: 12}).map(Number.call, Number)
      .map((i: number) => new Date(new Date().getFullYear(), i, 0).getDate())
      // tslint:disable-next-line:no-any
      .reduce((p: any, x: any) => { p = [...p, p[p.length - 1] + x]; return p; }, [0]);
    const days: number[] = Array.apply(null, {length: 365}).map(Number.call, Number);
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const size = Math.min(width, height) * 0.8;
    return (
      <div className="App">
        <svg viewBox="-1 -1 2 2" width={size} height={size}
            style={{ left: (width - size) / 2, top: (height - size) / 2 }}>
          <DayLine day={day} s={0} e={1} sw={0.03} />
          {months.map(i => <DayLine key={i} day={i} s={0.9} e={1} sw={0.03} />)}
          {days.map(i => <DayLine key={i} day={i} s={0.98} e={1} sw={0.003} />)}
        </svg>
      </div>
    );
  }
}

export default App;
