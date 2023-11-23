import { Separator } from "@/components/ui/separator"

const getAirport = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/airport/${id}`)
  const airport = await res.json()

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return airport.airport[0]
}

const getFrequencies = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/airport/${id}/frequencies`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const getArrivals = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/airport/${id}/arrivals`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}
const getDepartures = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/airport/${id}/departures`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const Page = async ({ params }: { params: { id: string } }) => {
  const airport = await getAirport(params.id)
  const frequencies = await getFrequencies(params.id)
  const arrivals = await getArrivals(params.id)
  const departures = await getDepartures(params.id)

  return (
    <div className="mt-5">
      <p className="text-lg font-medium tracking-wide leading-none">
        {airport.id}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight">
        {airport.name}
      </h1>
      <p>
        {airport.city}, {airport.region}
      </p>
      <Separator className="mb-10 mt-5" />
    </div>
  )
}

export default Page
