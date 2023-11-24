import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const getPopularAirports = async () => {
  const res = await fetch('http://localhost:3000/api/popular')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const getRandomAirport = async () => {
  const res = await fetch(`http://localhost:3000/api/airport`)
  const data = await res.json()

  return data.airports[Math.floor(Math.random() * data.airports.length)]
}

const Home = async () => {
  const popularAirports = await getPopularAirports()
  const randomAirport = await getRandomAirport()
  return (
    <>
      <div className="w-fit mx-auto space-y-6">
        <div className="text-center space-y-1.5">
          <div className="text-5xl lg:text-7xl font-semibold space-y-1 tracking-tighter">
            <h1>Listen to Live</h1>
            <h1>Air Traffic Control</h1>
          </div>
          <p className="text-xl">Listen to 1,000+ Live Frequencies For Free</p>
        </div>
        <div className="w-fit mx-auto flex items-center space-x-4 font-medium">
          <Link href="/airport" className={buttonVariants({ variant: 'default' })}>
            Listen Now
          </Link>
          <Link
            href={`/airport/${randomAirport.id}`}
            className={buttonVariants({ variant: 'outline' })}
          >
            Random Airport
          </Link>
        </div>
      </div>

      <h1 className="text-4xl font-semibold">Popular</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-8">
        {popularAirports.popularAirports.map((airport: any) => (
          <Card key={airport.id}>
            <Link href={`/airport/${airport.id}`}>
              <CardHeader>
                <CardTitle className="tracking-wide">{airport.id}</CardTitle>
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

export default Home
