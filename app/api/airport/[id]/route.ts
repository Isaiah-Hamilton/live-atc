import supabase from '@/lib/supabase'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { data: airport, error } = await supabase.from('airports').select('*').eq('id', params.id.toUpperCase())

  await supabase
    .from('airports')
    // @ts-ignore
    .update({ views: airport[0]?.views + 1 })
    .eq('id', params.id.toUpperCase())

  await supabase.from('airports').update({ updated_at: new Date().toISOString() }).eq('id', params.id.toUpperCase())

  if (error) {
    return Response.json({ error })
  }

  return Response.json({ airport })
}
