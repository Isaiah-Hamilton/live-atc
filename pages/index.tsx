import Link from "next/link";
import { useRouter } from "next/router";
import type { NextPage } from "next";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Layout from "@/components/Layout";
import Section from "@/components/Section";

export const getServerSideProps = async ({ query }: any) => {
  const { lat, lon } = query;

  const popularResponse = await fetch(
    `${process.env.API_URL}/api/airport/popular`,
  );
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
    const res = await fetch(`${process.env.API_URL}/api/airport`);
    const data = await res.json();
    const RandomAirport =
      data.airport[Math.floor(Math.random() * data.airport.length)];
    router.push(`/airport/${RandomAirport.id}`);
  };
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
            <Link href="/airport" className={buttonVariants()}>
              Listen Now
            </Link>
            <Button variant="outline" onClick={() => RandomAirport()}>
              Random Airport
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <h1 className="text-4xl font-semibold">Popular</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-8">
          {popularAirports?.map((airport: any) => (
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
      </Section>
    </Layout>
  );
};

export default Home;
