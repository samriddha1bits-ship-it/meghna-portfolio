import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="site not-found">
      <p className="nf-code">404</p>
      <h1>
        This page hasn&apos;t been <em>written</em> yet.
      </h1>
      <p>
        The story you&apos;re looking for isn&apos;t here — but plenty of others are.
      </p>
      <Link className="primary-button" href="/">
        Back to the beginning <span>↗</span>
      </Link>
    </main>
  );
}
