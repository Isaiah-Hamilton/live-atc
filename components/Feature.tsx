import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import AirportData from '../data/Airport.json'
import Airport from '../types/airport'

const Hero = () => {
  const [data, setData]: any = useState('')
  const airportCode = 'KATL'

  useEffect(() => {
    fetch(`https://atc-api.herokuapp.com/${airportCode}`, { method: 'GET' })
      .then((res) => res.json())
      .then((data) => setData(data))
  }, [])

  const airportData: any = AirportData.find((airport: Airport) => airport.icao === airportCode)

  return (
    <div>
      <Link href={`/airport/${airportCode}`}>
        <a>
          <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-lg">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/airports/${airportCode}.jpg`}
              alt="Airport Image"
              layout="fill"
              objectFit="cover"
              className="w-full h-full brightness-50"
            />
            <div className="absolute bottom-0 inset-x-0 text-white text-4xl font-medium p-2">
              {data.airport} - {airportData.name}
            </div>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default Hero
