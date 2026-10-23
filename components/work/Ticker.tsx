export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        {Array.from({ length: 4 }, (_, i) => (
          <span key={i}>
            WORDS &amp; IDEAS <b>✳</b> STORIES THAT STAY <b>✳</b> ASPIRING JOURNALIST <b>✳</b>
          </span>
        ))}
      </div>
    </div>
  );
}
