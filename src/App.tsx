import * as React from 'react';
import './App.css';

interface DayLineProps {
  day: number;
  startRadius: number;
  endRadius: number;
  strokeWidth: number;
}

function DayLine({ day, startRadius, endRadius, strokeWidth }: DayLineProps) {
  const p = -Math.PI / 2 + Math.PI * 2 * day / 365;
  return (
    <line
      x1={Math.cos(p) * startRadius}
      y1={Math.sin(p) * startRadius}
      x2={Math.cos(p) * endRadius}
      y2={Math.sin(p) * endRadius}
      stroke="#000"
      strokeWidth={strokeWidth} />
  );
}

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

class App extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }
  render() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    // tslint:disable-next-line:no-any
    const diff = (now as any) - (start as any);
    const day = diff / ONE_DAY_IN_MS;

    // Star day number for each month in a year; 0, 31, 61...
    const months: number[] = Array.apply(null, {length: 12}).map(Number.call, Number)
      .map((i: number) => new Date(new Date().getFullYear(), i, 0).getDate())
      // tslint:disable-next-line:no-any
      .reduce((p: any, x: any) => { p = [...p, p[p.length - 1] + x]; return p; }, [0]);

    // All days in a year; 0, 1, 2, 3...
    const days: number[] = Array.apply(null, {length: 365}).map(Number.call, Number);

    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    const size = Math.min(width, height) * 0.8;

    return (
      <div className="App">
        <svg viewBox="-1 -1 2 2" width={size} height={size}
            style={{ left: (width - size) / 2, top: (height - size) / 2 }}>
          <DayLine day={day} startRadius={0} endRadius={1} strokeWidth={0.03} />
          {months.map(i => <DayLine key={i} day={i} startRadius={0.9} endRadius={1} strokeWidth={0.03} />)}
          {days.map(i => <DayLine key={i} day={i} startRadius={0.98} endRadius={1} strokeWidth={0.003} />)}
        </svg>
      </div>
    );
  }
}

export default App;
