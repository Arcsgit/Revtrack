import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; error?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  if (params.error) {
    console.error("Auth error:", params.error);
    return redirect("/sign-in?error=" + encodeURIComponent(params.error));
  }

  if (params.code) {
    const { error } = await supabase.auth.exchangeCodeForSession(params.code);
    
    if (error) {
      console.error("Error exchanging code for session:", error);
      return redirect("/sign-in?error=" + encodeURIComponent(error.message));
    }
  }

  return redirect("/");
}
