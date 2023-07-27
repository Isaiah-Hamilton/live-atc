import { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../lib/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: airports, error } = await supabase
    .from('airports')
    .select('*')
    .order('views', { ascending: false })
    .limit(5)

  if (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ airports })
}