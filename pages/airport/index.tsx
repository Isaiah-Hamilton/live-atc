import { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/Layout";

export const getServerSideProps = async () => {
  const response = await fetch(`${process.env.API_URL}/api/airport`);
  const data = await response.json();

  return {
    props: {
      airports: data.airport,
    },
  };
};

const Airport: NextPage = ({ airports }: any) => {
  return (
    <Layout>
      <h1 className="text-4xl font-semibold mt-8 mb-6">Airports</h1>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {airports?.map((airport: any) => (
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
    </Layout>
  );
};

export default Airport;
