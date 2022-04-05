import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import { InfoCircledIcon, Cross2Icon } from '@radix-ui/react-icons'
import Layout from '../../components/Layouts'
import Airport from '../../types/airport'
import AirportCodes from '../../data/Airport.json'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

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
  const [FrequencyName, setFrequencyName] = useState<string | null>(null)
  const [toast, setToast] = useState<string>('show')
  const airportData: any = AirportCodes.find((airport: Airport) => airport.icao === data.airport)

  return (
    <Layout>
      <div id='div' className="md:flex md:justify-between">
        <div className="space-y-2 w-full h-max">
          <h1 className="text-xl md:text-2xl font-medium">
            {FrequencyName === null ? `${data.airport} - ${airportData.name}` : FrequencyName}
          </h1>
          <div className="relative w-full h-72 md:h-96">
            <Image
              src={
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/airports/${id}.jpg` ||
                '/placeholder.png'
              }
              alt="Airport Image"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-xl mt-2"
            />
          </div>
          {Frequency === null ? (
            <></>
          ) : (
            <>
              <div
                className={`bg-blue-500 rounded-lg text-white p-2 flex items-center justify-between ${
                  toast === 'show' ? 'block' : 'hidden'
                }`}
              >
                <div className="flex items-center space-x-1 text-xs lg:text-base">
                  <InfoCircledIcon />
                  <span>Audio will automatically start, If audio stops then reload page.</span>
                </div>
                <div className="justify-self-end cursor-pointer">
                  <Cross2Icon onClick={() => {setToast('hide')}} />
                </div>
              </div>
              <audio controls autoPlay className="rounded-lg w-full">
                <source src={Frequency || ''} />
                Your browser does not support the audio element.
              </audio>
            </>
          )}
        </div>
        <div className="space-y-2 md:ml-8 min-w-fit">
          <h1 className="text-2xl font-medium">Frequency</h1>
          <div>
            <ul className={`overflow-y-scroll overflow-hidden frequency_height`}>
              {data.frequency.map((element: any, i: number) => {
                return (
                  <li
                    key={i}
                    className="bg-gray-200 dark:bg-gray-700 rounded-lg mb-4 p-2 border-2 border-gray-200 dark:border-gray-600 hover:border-2 hover:border-blue-400 dark:hover:border-blue-500 min-w-max"
                  >
                    <button
                      onClick={() => {
                        setFrequency(element.audioLink), setFrequencyName(element.name)
                      }}
                      disabled={element.status === 'DOWN'}
                      className="text-left w-full"
                    >
                      <div className="grid grid-rows-4 grid-flow-col gap-2">
                        <h1 className="font-medium">{element.name}</h1>
                        <span>{element.frequency}</span>
                        <span>
                          Listeners: {element.status === 'DOWN' ? '0' : element.listeners}
                        </span>
                        <span>Status: {element.status}</span>
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
