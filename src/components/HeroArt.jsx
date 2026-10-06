// Decorative: a sort caught mid-way, drawn with the same state colours the visualizer uses
const BARS = [[30, 'ok'], [48, 'ok'], [66, 'ok'], [110, 's'], [72, 's'], [96, 'c'], [54, '']];
export default function HeroArt() {
  return (
    <svg className="heroart" viewBox="0 0 220 160" aria-hidden="true">
      {BARS.map(([h, c], i) => <rect key={i} x={8 + i * 30} y={150 - h} width="20" height={h} className={c} />)}
      <line x1="0" y1="152" x2="220" y2="152" stroke="#1d2129" strokeWidth="2" />
    </svg>
  );
}
