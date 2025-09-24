"use client";
import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";

export default function TestClient() {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    const supabase = createSupabaseBrowserClient();
    supabase
      .from("your_table")
      .select("*")
      .limit(5)
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setRows(data);
      });
  }, []);

  if (!rows) return <div>Loading...</div>;
  return <pre>{JSON.stringify(rows, null, 2)}</pre>;
}
