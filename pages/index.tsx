import type { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
// import { SUPABASE_URL } from '../lib/supabase'
import Layout from '../components/Layout'
import Section from '../components/Section'
import Balancer from 'react-wrap-balancer'
 
export const getServerSideProps = async ({ query }: any) => {
  const { lat, lon } = query

  const featuredResponse = await fetch(`http://localhost:3000/api/featured-airport?lat=${lat}&lon=${lon}`)
  const featuredData = await featuredResponse.json()

  //const popularResponse = await fetch(`http://localhost:3000/api/popular-airports`)
  //const popularData = await popularResponse.json()

  return {
    props: {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      featuredAirport: featuredData.airport,
      //popularAirports: popularData.airports,
    },
  }
}

const Home: NextPage = ({ featuredAirport, popularAirports }: any) => {
  return (
    <Layout>
      <Section>
        <Link href={`/airport/${featuredAirport?.id}`}>
          <div className="w-full rounded-xl shadow-lg">
            <div className='text-4xl'>{featuredAirport?.id}</div>
            <Balancer className='text-4xl'>
              {featuredAirport?.name}
            </Balancer>
            <div className='text-4xl'>{featuredAirport?.city}, {featuredAirport?.region}</div>
          </div>
        </Link>
      </Section>

      <Section>
        <h1 className="text-4xl font-semibold mb-4">Popular</h1>
        <div className="flex items-center space-x-4 py-8 justify-between overflow-x-scroll">
          {/*popularAirports?.map((airport: any, i: number) => (
            <div className="hover:-translate-y-4 ease-in-out duration-300" key={i}>
              <Link href={`/airport/${airport.id}`}>
                <div className="relative w-60 h-44 md:w-80 md:h-64 overflow-hidden rounded-xl shadow-md bg-gray-100 dark:bg-gray-700">
                  <div className="absolute bottom-0 inset-x-0 text-white text-4xl font-medium p-2">
                    <p>{airport.id}</p>
                    <p>{airport.name}</p>
                    <p>{featuredAirport?.city}, {featuredAirport?.region}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))*/}
        </div>
      </Section>

      <Section>
        <h1 className="text-4xl font-semibold mb-4">New Live ATC Feed</h1>
      </Section>
    </Layout>
  )
}

export default Home