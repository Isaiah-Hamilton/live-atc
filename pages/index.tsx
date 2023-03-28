import { NextPage } from "next";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import supabase, { SUPABASE_URL } from "../lib/supabase";
import Layout from "../components/Layout";
import Section from "../components/Section";
import Balancer from "react-wrap-balancer";

const Home: NextPage = () => {
  const [featuredData, setFeaturedData] = useState([]);
  const [popularData, setPopularData] = useState([]);
  useEffect(() => {
    const fetchFeaturedData = async () => {
      let { data: airports } = await supabase
        .from("airports")
        .select("*")
        .eq("icao", "KATL")
        .single();
      // @ts-ignore
      setFeaturedData(airports);
    };

    const fetchPopularData = async () => {
      let { data: airports } = await supabase
        .from("airports")
        .select("*")
        .order("views", { ascending: false })
        .limit(5);
      // @ts-ignore
      setPopularData(airports);
    };

    fetchFeaturedData();
    fetchPopularData();
  }, []);

  return (
    <Layout>
      {/* Featured */}
      <Section>
        <Link href={`/airport/katl`}>
          <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-lg">
            <Image
              src={`${SUPABASE_URL}/storage/v1/object/public/airports/${featuredData?.icao}.jpg`}
              alt="Airport Image"
              layout="fill"
              objectFit="cover"
              className="w-full h-full brightness-50"
            />
            <div className="absolute bottom-0 inset-x-0 text-white text-2xl md:text-4xl font-medium px-4 py-2">
              <Balancer>
                {featuredData?.icao} - {featuredData?.full_name}
              </Balancer>
            </div>
          </div>
        </Link>
      </Section>

      {/* Popular */}
      <Section>
        <h1 className="text-4xl font-semibold mb-4">Popular</h1>
        <div className="flex items-center space-x-4 py-8 justify-between overflow-x-scroll">
          {popularData?.map((airport: any, i: number) => (
            <div
              className="hover:-translate-y-4 ease-in-out duration-300"
              key={i}
            >
              <Link href={`/airport/${airport.icao}`}>
                <div className="relative w-60 h-44 md:w-80 md:h-64 overflow-hidden rounded-xl shadow-md bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={`${SUPABASE_URL}/storage/v1/object/public/airports/${airport.icao}.jpg`}
                    alt="Airport Image"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full brightness-50"
                  />
                  <div className="absolute bottom-0 inset-x-0 text-white text-4xl font-medium p-2">
                    {airport.icao}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default Home;
