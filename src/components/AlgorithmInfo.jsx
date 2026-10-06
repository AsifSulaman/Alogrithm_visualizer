// Shown before the visualization so the learner knows what they are about to watch
export default function AlgorithmInfo({ info }) {
  return (
    <section className="explain card" aria-label="Explanation">
      <div>
        <h2>What it does</h2><p>{info.what}</p>
        {info.note && <p className="callout">{info.note}</p>}
      </div>
      <div>
        <h2>How it works</h2>
        <ol>{info.steps.map(s => <li key={s}>{s}</li>)}</ol>
      </div>
    </section>
  );
}
