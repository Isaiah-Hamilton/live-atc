import { NextRequest, NextResponse } from "next/server";

export default function handler(req: NextRequest, res: NextResponse) {
  const city = req.geo?.city;
  const region = req.geo?.region;
  const country = req.geo?.country;

  res.status(200).json({
    city: city,
    region: region,
    country: country,
  });
}
