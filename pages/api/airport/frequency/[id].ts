import { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../../lib/supabase'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id

  const { data: frequencies, error } = await supabase
    .from('airport_frequencies')
    .select('*')
    .eq('airport', id)
  
  if (error) {
    return res.status(500).json({ error })
  }

  return res.status(200).json({ frequencies })
}