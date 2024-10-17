// app/api/getUsers/route.ts
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Use the service role key securely on the server-side
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE! // Safe to use here as it's server-side
);

export async function GET() {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ users: data.users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
