import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import Layout from '../../components/Layouts'
import Airport from '../../types/airport'
import AirportCodes from '../../data/Airport.json'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Frequency from '../../components/Frequency'

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
  const airportData: any = AirportCodes.find((airport: Airport) => airport.icao === data.airport)

  return (
    <Layout>
      <h1 className="text-2xl font-medium my-4">
        {data.airport}
        {' - '}
        {airportData.name}
      </h1>
      <Image
        src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/airports/${id}.jpg`}
        alt="Airport Image"
        width={800}
        height={400}
        className="rounded-2xl"
      />
      {/*<audio controls className="rounded-xl">
        <source src={data.frequency[0].audioLink} />
        Your browser does not support the audio element.
      </audio>*/}
      <div>
        <h1 className="text-2xl font-medium my-4">Frequency</h1>
        <div className="dark:bg-gray-800 pb-4">
          <Frequency data={data} />
        </div>
      </div>
    </Layout>
  )
}

export default Airport
