import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import Layout from "../components/Layout";
import Section from "../components/Section";

export const getServerSideProps = async ({ query }: any) => {
  const { lat, lon } = query;

  const popularResponse = await fetch(`${process.env.API_URL}/api/airport/popular`);
  const popularData = await popularResponse.json();

  return {
    props: {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      popularAirports: popularData.airports,
    },
  };
};

const Home: NextPage = ({ popularAirports }: any) => {
  const router = useRouter();
  const RandomAirport = async () => {
    const res = await fetch(`${process.env.API_URL}/api/airport`)
    const data = await res.json()
    const RandomAirport = data.airport[Math.floor(Math.random() * data.airport.length)]
    router.push(`/airport/${RandomAirport.id}`)
  }
  return (
    <Layout>
      <Section>
        <div className="w-fit mx-auto space-y-6">
          <div className="text-center space-y-1.5">
            <div className="text-5xl lg:text-7xl font-semibold space-y-1 tracking-tighter">
              <h1>Listen to Live</h1>
              <h1>Air Traffic Control</h1>
            </div>
            <p className="text-xl">
              Listen up to 1,000+ live Frequencies for free
            </p>
          </div>
          <div className="w-fit mx-auto flex items-center space-x-4 font-medium">
            <Link
              href="/airport"
              className="bg-[#232c34] border border-[#09131d] py-3 px-6 rounded-xl text-white"
            >
              Listen Now
            </Link>
            <button
              onClick={() => RandomAirport()}
              className="border border-[#09131d] py-3 px-6 rounded-xl text-[#232c34]"
            >
              Random Airport
            </button>
          </div>
        </div>
      </Section>

      <Section>
        <h1 className="text-4xl font-semibold">Popular</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-8">
          {popularAirports?.map((airport: any) => (
            <div key={airport.id}>
              <Link href={`/airport/${airport.id}`}>
                <div className="h-full py-4 px-5 rounded-xl border border-[#09131d]">
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
      </Section>
    </Layout >
  );
};

export default Home;
