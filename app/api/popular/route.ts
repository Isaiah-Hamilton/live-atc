import supabase from '@/lib/supabase'

export async function GET() {
  const { data: popularAirports, error } = await supabase
    .from('airports')
    .select('*')
    .order('views', { ascending: false })
    .limit(6)

  if (error) {
    return Response.error()
  }

  return Response.json({ popularAirports })
}
