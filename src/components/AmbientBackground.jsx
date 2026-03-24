export default function AmbientBackground() {
  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-bg__blob ambient-bg__blob--blue" />
      <div className="ambient-bg__blob ambient-bg__blob--gold" />
      <div className="ambient-bg__grid" />
      <div className="ambient-bg__noise" />
    </div>
  );
}
