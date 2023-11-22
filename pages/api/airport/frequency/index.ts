import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../../lib/supabase';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const airport = req.query.airport;

  if (!airport) {
    const { data: frequencies, error } = await supabase.from('airport_frequencies').select('*');

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(200).json({ frequencies });
  }

  const { data: frequencies, error } = await supabase
    .from('airport frequencies')
    .select('*')
    .eq('airport', airport);

  if (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ frequencies });
};
