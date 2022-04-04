import type { NextPage } from 'next'
import Layout from '../components/Layouts'
import Head from 'next/head'
import Image from 'next/image'
import Feature from '../components/Feature'
import Airport from '../types/airport'
import Link from 'next/link'

const Home: NextPage = () => {
  const popArray = ['KATL', 'KLAX', 'KSFO', 'KJFK']

  return (
    <Layout>
      <Feature />
      <div className="mt-10">
        <h1 className="text-4xl font-medium">Popular</h1>
        <div className="flex justify-between items-center my-8">
          {popArray.map((element, i) => {
            return (
              <div className="hover:-translate-y-4 ease-in-out duration-300" key={i}>
                <Link href={`/airport/${element}`}>
                  <a>
                    <div className="relative w-80 h-64 overflow-hidden rounded-xl shadow-md bg-gray-100 dark:bg-gray-700">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/airports/${element}.jpg`}
                        alt="Airport Image"
                        layout="fill"
                        objectFit="cover"
                        className="w-full h-full brightness-50"
                      />
                      <div className="absolute bottom-0 inset-x-0 text-white text-4xl font-medium p-2">
                        {element}
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Home
