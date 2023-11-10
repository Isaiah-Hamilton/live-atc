import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { data: airport, error } = await supabase
    .from("airports")
    .select("*")
    .eq("id", req.query.id);

  await supabase
    .from("airports")
    // @ts-ignore
    .update({ views: airport[0]?.views + 1 })
    .eq("id", req.query.id);

  await supabase
    .from("airports")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", req.query.id);

  const response = await fetch(
    `https://api.flightradar24.com/common/v1/airport.json?code=${req.query.id
    }&plugin[]=&plugin-setting[schedule][mode]=&plugin-setting[schedule][timestamp]=${Math.floor(
      new Date().getTime() / 1000,
    )}&page=1&limit=100&fleet=&token=`,
  );
  const data = await response.json();
  const image = data.result.response.airport.pluginData.details.airportImages;

  if (error) {
    return res.status(500).json({ error });
  }

  return res.status(200).json({ airport, image });
};
