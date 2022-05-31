import Link from "next/link"
import Image from "next/image"
import Layout from "../../components/Layouts"
import Data from "../../data/Airport.json"
import Airport from "../../lib/types/airport"

const airport = () => {
  return (
    <Layout>
      <h1 className="text-4xl font-semibold mt-4 mb-8">
        Airports
      </h1>
      <div className="space-y-10">
        {Data.map((airport: Airport, i: number) => {
          return (
            <div key={i}>
              <Link href={`/airport/${airport.icao}`}>
                <a className="flex space-x-4">
                  <Image className="rounded-lg" src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/airports/${airport.icao}.jpg`} width={300} height={"165"} alt={`${airport.icao} image`} />
                  <div>
                    <h2 className="text-lg font-medium">
                      {airport.icao} - {airport.name}
                    </h2>
                    <p>{airport.city}, {airport.state}</p>
                  </div>
                </a>
              </Link>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default airport