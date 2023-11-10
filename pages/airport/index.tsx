import { NextPage } from "next";
import Link from "next/link";
import Layout from "@/components/Layout";
import Card from "@/components/Card";

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
          <Card airport={airport} />
        ))}
      </div>
    </Layout>
  );
};

export default Airport;
