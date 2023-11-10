import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import supabase from '@/lib/supabase'

export const getServerSideProps = async (context: any) => {
  const { keyword } = context.query

  let { data: airports } = await supabase.from('airports').select('*')

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
      <div className='h-screen'>
        <h1 className="text-4xl font-semibold mt-8 mb-6">Search for: {keyword}</h1>
        {airports?.length < 0 ? (
          <div className="grid gap-6 grid-cols-1">
            {airports?.map((airport: any, i: number) => (
              <div key={airport.id}>
                <Link href={`/airport/${airport.id}`}>
                  <div className="h-full py-4 px-5 rounded-xl border border-[#09131d] w-fit">
                    <h3 className="text-xl font-semibold">{airport.id}</h3>
                    <p className="font-medium">{airport.name}</p>
                    <p className="text-sm">
                      {airport?.city}, {airport?.region}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div>Nothing Found</div>
        )}
      </div>
    </Layout>
  )
}

export default Search;