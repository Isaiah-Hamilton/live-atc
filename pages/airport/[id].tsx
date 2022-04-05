import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Layout from '../../components/Layouts'
import Airport from '../../types/airport'
import AirportCodes from '../../data/Airport.json'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const getStaticProps: GetStaticProps = async (context) => {
  const params = context.params
  const response = await fetch(`https://atc-api.herokuapp.com/${params!.id}`, {
    method: 'GET',
  })
  const data = await response.json()

  if (!data) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  return {
    props: {
      data,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: AirportCodes.map((a) => {
      return { params: { id: a.icao } }
    }),
    fallback: false,
  }
}

const Airport: NextPage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { id } = router.query
  const [Frequency, setFrequency] = useState<string | null>(null)
  const airportData: any = AirportCodes.find((airport: Airport) => airport.icao === data.airport)

  return (
    <Layout>
      <div className="flex justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-medium">
            {data.airport}
            {' - '}
            {airportData.name}
          </h1>
          <div>
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/airports/${id}.jpg` || "/placeholder.png"}
              alt="Airport Image"
              width={800}
              height={400}
              className="rounded-2xl mt-2"
            />
          </div>
          {Frequency === null ? (
            <></>
          ) : (
            <audio controls autoPlay className="rounded-xl w-full">
              <source src={Frequency || ''} />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-medium">Frequency</h1>
          <div>
            <ul className="overflow-y-scroll frequency_height">
              {data.frequency.map((element: any, i: number) => {
                return (
                  <li
                    key={i}
                    className="bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 p-2 border-2 border-gray-200 dark:border-gray-600 hover:border-2 hover:border-brand-600 dark:hover:border-brand-800"
                  >
                    <button
                      onClick={() => {
                        setFrequency(element.audioLink)
                      }}
                      disabled={element.status === 'DOWN'}
                      className="text-left w-full"
                    >
                      <h1>{element.name}</h1>
                      <div className="grid grid-rows-3 grid-flow-col gap-2">
                        <span>{element.frequency}</span>
                        <span>Status: {element.status}</span>
                        <span>
                          Listeners: {element.status === 'DOWN' ? '0' : element.listeners}
                        </span>
                      </div>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Airport
