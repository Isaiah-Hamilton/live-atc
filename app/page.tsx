import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const getPopularAirports = async () => {
  const res = await fetch('http://localhost:3000/api')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

const Home = async () => {
  const popularAirports = await getPopularAirports()
  return (
    <>
      <div className="w-fit mx-auto space-y-6">
        <div className="text-center space-y-1.5">
          <div className="text-5xl lg:text-7xl font-semibold space-y-1 tracking-tighter">
            <h1>Listen to Live</h1>
            <h1>Air Traffic Control</h1>
          </div>
          <p className="text-xl">Listen up to 1,000+ live Frequencies for free</p>
        </div>
        <div className="w-fit mx-auto flex items-center space-x-4 font-medium">
          <Link href="/airport" className={buttonVariants({ variant: 'default' })}>
            Listen Now
          </Link>
          <Link href="/" className={buttonVariants({ variant: 'outline' })}>
            Random Airport
          </Link>
        </div>
      </div>

      <h1 className="text-4xl font-semibold">Popular</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-8">
        {popularAirports.popularAirports.map((airport: any) => (
          <div key={airport.id}>{airport.id}</div>
        ))}
      </div>
    </>
  )
}

export default Home
