import { Separator } from '@/components/ui/separator'
import AirportPage from '@/components/airportPage'
import type { Metadata } from 'next'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `${params.id.toUpperCase()} | Live ATC`,
    description: `Listen to ${params.id.toUpperCase()} on Live ATC`,
  }
}

const getAirport = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/airport/${id}`)
  const airport = await res.json()

  if (!res.ok) {
    throw new Error('Failed to fetch `Airport` data')
  }

  return airport.airport[0]
}

const getFrequencies = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/airport/${id}/frequencies`)

  if (!res.ok) {
    throw new Error('Failed to fetch `Frequencies` data')
  }

  return res.json()
}

const getArrivals = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/airport/${id}/arrivals`)

  if (!res.ok) {
    return null
  }

  return res.json()
}
const getDepartures = async (id: string) => {
  const res = await fetch(`${process.env.API_URL}/api/airport/${id}/departures`)

  if (!res.ok) {
    return null
  }

  return res.json()
}

const Page = async ({ params }: { params: { id: string } }) => {
  const airport = await getAirport(params.id)
  const frequencies = await getFrequencies(params.id)
  const arrivals = await getArrivals(params.id)
  const departures = await getDepartures(params.id)

  return (
    <>
      <div className="mt-5 mb-10">
        <p className="text-lg font-medium tracking-wide leading-none">{airport.id}</p>
        <h1 className="text-4xl font-semibold tracking-tight">{airport.name}</h1>
        <p>
          {airport.city}, {airport.region}
        </p>
        <Separator className="mt-5" />
      </div>
      <AirportPage
        frequencies={frequencies.frequencies}
        arrivals={arrivals}
        departures={departures}
      />
    </>
  )
}

export default Page
