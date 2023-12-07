import { NextRequest } from "next/server"
import supabase from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const keyword = request.nextUrl.searchParams.get("keyword")

  if (keyword === null) {
    return Response.json({ error: 'missing keyword param' })
  }

  if (keyword.includes(' ')) {
    let keywords: string | string[] = keyword.split(' ')
    keywords = keywords.map(item => `'${item}'`).join(' & ')

    const { data: search, error } = await supabase
      .from('airports')
      .select('*')
      .textSearch('search', keywords)

    if (error) {
      return Response.json({ error })
    }

    return Response.json({ keyword, search })
  }

  const { data: search, error } = await supabase
    .from('airports')
    .select('*')
    .textSearch('search', keyword)

  if (error) {
    return Response.json({ error })
  }

  return Response.json({ search })
}
