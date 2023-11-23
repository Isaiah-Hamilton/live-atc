import supabase from '@/lib/supabase'

export async function GET() {
  const { data: airports, error } = await supabase.from('airports').select('*')

  if (error) {
    return Response.error()
  }

  return Response.json({ airports })
}
