import { NextApiRequest, NextApiResponse } from 'next';
import supabase from '../../../lib/supabase';
import cheerio from 'cheerio';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch('https://www.liveatc.net/topfeeds.php');
  const html = await response.text();
  const $ = cheerio.load(html);

  const listeners = [];
  for (let i = 8; i < 120; ) {
    if (listeners[listeners.length - 1] === '') {
      listeners.pop();
      break;
    } else {
      listeners.push(
        $(
          `table.body:nth-child(${i}) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > strong:nth-child(1)`
        ).text()
      );
      i += 3;
    }
  }

  const feed = [];
  for (let i = 8; i < 120; ) {
    if (feed[feed.length - 1] === '') {
      feed.pop();
      break;
    } else {
      feed.push(
        $(
          `table.body:nth-child(${i}) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > strong:nth-child(1)`
        ).text()
      );
      i += 3;
    }
  }

  const { data: airports } = await supabase
    .from('airport_frequencies')
    .select('*')
    .order('listeners', { ascending: false });

  return res.status(200).json({ airports });
};
