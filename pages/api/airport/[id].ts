import { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../lib/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: airport, error } = await supabase
    .from('airports')
    .select('*')
    .eq('id', req.query.id)

  if (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ airport })
}