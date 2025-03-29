import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();
  const { task } = await req.json();

  const { data, error } = await supabase
    .from("todos")
    .insert([{ task }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}

export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("todos").select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 200 });
}

export async function DELETE(req: Request) {
  const supabase = await createClient();
  const { uuid } = await req.json();

  const {data, error} = await supabase.from("todos").delete().eq("uuid", uuid);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
