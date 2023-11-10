import { NextApiRequest, NextApiResponse } from "next";
import supabase from "../../../lib/supabase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat/lon" });
  }

  const userLat = Number(lat);
  const userLon = Number(lon);

  const { data: airports, error } = await supabase.from("airports").select("*");

  if (error) {
    return res.status(500).json({ error });
  }

  let airport = airports.sort((a: any, b: any) => {
    const aDist = Math.abs(a.lat - userLat) + Math.abs(a.lon - userLon);
    const bDist = Math.abs(b.lat - userLat) + Math.abs(b.lon - userLon);
    return aDist - bDist;
  });
  airport = airport.slice(0, 5);

  // @ts-ignore
  airport = airports.sort((a: any, b: any) => b.views - a.views)[0];

  return res.status(200).json({ airport });
};
