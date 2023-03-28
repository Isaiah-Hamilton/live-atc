import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import supabase, { SUPABASE_URL } from '@/lib/supabase'

export const getServerSideProps = async (context: any) => {
  const { keyword } = context.query

  let { data: airports } = await supabase.from('airports').select('*').textSearch('search', keyword)

  if (!airports) {
    return {
      props: {
        notFound: true,
      },
    }
  }

  return { props: { airports } }
}

const Search: NextPage = ({ airports }: any) => {
  const router = useRouter()
  const { keyword } = router.query

  return (
    <Layout>
      <h1 className="text-4xl font-semibold mt-4 mb-8">Search for: {keyword}</h1>
      <div className="grid gap-x-6 gap-y-12 grid-cols-1">
        {airports?.map((airport: any, i: number) => (
          <Link className="flex space-x-4 h-[200px]" href={`/airport/${airport.icao}`} key={i}>
            <Image
              className="rounded-lg"
              src={`${SUPABASE_URL}/storage/v1/object/public/airports/${airport.icao}.jpg`}
              width="300"
              height="200"
              alt={`${airport.icao} image`}
            />
            <div>
              <h2 className="text-lg font-medium">
                {airport.icao} - {airport.full_name}
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

export default Search
