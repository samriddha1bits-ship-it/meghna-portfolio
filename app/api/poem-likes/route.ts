import { NextResponse } from "next/server";

const poemIds = ["solitude-haven", "ask-the-moon", "a-tapestry-anew", "in-the-darkest-veil"];
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

function configured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

function headers() {
  return {
    apikey: supabaseAnonKey!,
    "Content-Type": "application/json",
  };
}

export async function GET() {
  if (!configured()) {
    return NextResponse.json({ error: "Poem likes are not configured." }, { status: 503 });
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/poem_likes?select=poem_id,likes`, {
      headers: headers(),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Supabase responded ${response.status}`);
    const rows = (await response.json()) as Array<{ poem_id: string; likes: number }>;
    const likes = Object.fromEntries(poemIds.map((id) => [id, 0]));
    for (const row of rows) {
      if (poemIds.includes(row.poem_id) && Number.isInteger(row.likes)) likes[row.poem_id] = row.likes;
    }
    return NextResponse.json({ likes }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Could not load poem likes:", error);
    return NextResponse.json({ error: "Could not load poem likes." }, { status: 502 });
  }
}

export async function POST(request: Request) {
  if (!configured()) {
    return NextResponse.json({ error: "Poem likes are not configured." }, { status: 503 });
  }

  let poemId: unknown;
  try {
    ({ poemId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (typeof poemId !== "string" || !poemIds.includes(poemId)) {
    return NextResponse.json({ error: "Unknown poem." }, { status: 400 });
  }

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/increment_poem_like`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ p_poem_id: poemId }),
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Supabase responded ${response.status}`);
    const count = (await response.json()) as unknown;
    if (typeof count !== "number") throw new Error("Supabase returned an invalid like count");
    return NextResponse.json({ poemId, likes: count }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Could not save poem like:", error);
    return NextResponse.json({ error: "Could not save your like." }, { status: 502 });
  }
}
