import { NextPage } from 'next'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import supabase, { SUPABASE_URL } from '../../lib/supabase'
import Layout from '../../components/Layout'
import Balancer from 'react-wrap-balancer'

const Airport: NextPage = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let { data: airports } = await supabase
        .from('airports')
        .select('*')
        .order('icao', { ascending: true })
      // @ts-ignore
      setData(airports)
    }
    fetchData()
  }, [])

  return (
    <Layout>
      <h1 className="text-4xl font-semibold mt-4 mb-8">Airports</h1>
      <div className="grid gap-x-6 gap-y-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((airport: any, i: number) => (
          <Link href={`/airport/${airport?.icao}`} key={i}>
            <div className="w-full h-4/5">
              <img
                className="w-full h-full rounded-lg"
                src={`${SUPABASE_URL}/storage/v1/object/public/airports/${airport.icao}.jpg`}
                alt={`${airport.icao} image`}
              />
            </div>
            <div className="mt-2">
              <h2 className="text-lg font-medium">
                <Balancer>
                  {airport?.icao} - {airport?.full_name}
                </Balancer>
              </h2>
              <p className="text-gray-500">
                {airport?.city}, {airport?.region}, {airport?.country}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export default Airport
