const FLAKES = Array.from({ length: 58 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  animationDelay: `${-((i * 7) % 24)}s`,
  animationDuration: `${14 + ((i * 13) % 18)}s`,
  opacity: 0.28 + ((i * 17) % 7) / 10,
  fontSize: `${7 + ((i * 11) % 10)}px`,
  glyph: i % 4 === 0 ? "✧" : i % 3 === 0 ? "❅" : "❄",
}));

export default function Snowfall() {
  return (
    <div className="snowfall" aria-hidden="true">
      {FLAKES.map(({ glyph, ...style }, i) => (
        <span className="snowflake" key={i} style={style}>
          {glyph}
        </span>
      ))}
    </div>
  );
}
