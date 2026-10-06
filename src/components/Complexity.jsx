export default function Complexity({ time, space, timeNote }) {
  return (
    <section>
      <h2>Complexity</h2>
      <table>
        <tbody>
          <tr><th scope="row">Time · Best</th><td>{time.best}</td></tr>
          <tr><th scope="row">Time · Average</th><td>{time.avg}</td></tr>
          <tr><th scope="row">Time · Worst</th><td>{time.worst}</td></tr>
          <tr><th scope="row">Space</th><td>{space}</td></tr>
        </tbody>
      </table>
      <p className="muted">{timeNote}</p>
    </section>
  );
}
