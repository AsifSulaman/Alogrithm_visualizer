export default function Controls({ playing, done, onToggle, onReplay, onStep, onReset, speed, setSpeed, extra }) {
  return (
    <div className="controls">
      {extra}
      <button className="btn primary" onClick={done ? onReplay : onToggle}>{playing ? 'Pause' : done ? 'Replay' : 'Start'}</button>
      <button className="btn" onClick={onStep} disabled={done || playing}>Step</button>
      <button className="btn" onClick={onReset}>Reset</button>
      <label className="speed">Speed
        <input type="range" min="1" max="10" value={speed} onChange={e => setSpeed(+e.target.value)} />
      </label>
    </div>
  );
}
