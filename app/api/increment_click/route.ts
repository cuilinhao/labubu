import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const { id } = await request.json()

  // In real app, this would increment click_count in Supabase
  // await supabase
  //   .from('items')
  //   .update({ click_count: supabase.raw('click_count + 1') })
  //   .eq('id', id)

  return NextResponse.json({ ok: true })
}
