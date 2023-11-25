import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Airports | Live ATC',
  description: 'See all available airports on Live ATC',
}

const getAirports = async () => {
  const res = await fetch(`${process.env.API_URL}/api/airport`)

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const Page = async () => {
  const airports = await getAirports()
  return (
    <>
      <h1 className="text-4xl font-semibold mt-8 mb-6">Airports</h1>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {airports.airports?.map((airport: any) => (
          <Card key={airport.id}>
            <Link href={`/airport/${airport.id}`}>
              <CardHeader>
                <CardTitle>{airport.id}</CardTitle>
                <CardDescription className="text-lg">{airport.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {airport?.city}, {airport?.region}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Page
