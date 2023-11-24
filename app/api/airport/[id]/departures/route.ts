export async function GET(req: Request, { params }: { params: { id: string } }) {
  const res = await fetch(
    `https://api.flightradar24.com/common/v1/airport.json?code=${params.id.toUpperCase()}&plugin[]=&plugin-setting[schedule][mode]=&plugin-setting[schedule][timestamp]=${
      new Date().getTime() / 1000
    }&page=1&limit=100&fleet=&token=`
  )
  const data = await res.json()

  if (!res.ok) {
    return Response.error()
  }

  return Response.json({
    departures: data.result.response.airport.pluginData.schedule.departures.data,
  })
}
