// app/api/test/route.js
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET() {
  const supabase = createSupabaseServerClient();

  // change 'your_table' to a real table name in your Supabase project
  const { data, error } = await supabase.from("your_table").select("*").limit(5);

  return new Response(
    JSON.stringify({ data, error }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}
