import supabase from '@/lib/supabase'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { data: frequencies, error } = await supabase
    .from('airport_frequencies')
    .select('*')
    .eq('airport', params.id.toUpperCase())

  if (error) {
    return Response.json({ error })
  }

  return Response.json({ frequencies })
}
