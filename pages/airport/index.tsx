import { NextPage } from "next";
import Layout from "@/components/Layout";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
          <Card key={airport.id}>
            <Link href={`/airport/${airport.id}`}>
              <CardHeader>
                <CardTitle>{airport.id}</CardTitle>
                <CardDescription className="text-lg">
                  {airport.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {airport?.city}, {airport?.region}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default Airport;
