import { useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import supabase, { SUPABASE_URL } from "../../lib/supabase";

export const getServerSideProps = async (context: any) => {
  const params = context.params;
  const response = await fetch(`https://atc-api.deno.dev/${params!.id}`);
  const data = await response.json();

  let { data: airports } = await supabase
    .from("airports")
    .select("views")
    .eq("icao", params!.id?.toUpperCase())
    .single();

  await supabase
    .from("airports")
    // @ts-ignore
    .update({ views: airports["views"] + 1 })
    .eq("icao", params!.id?.toUpperCase());

  if (!data) {
    return {
      props: {
        notFound: true,
      },
    };
  }

  return { props: { data } };
};

const Airport: NextPage = ({ data }: any) => {
  const router = useRouter();
  const { id }: any = router.query;
  const [frequency, setFrequency] = useState<string | null>(null);
  const [frequencyName, setFrequencyName] = useState<string | null>(null);

  return (
    <Layout>
      <div className="md:flex md:justify-between">
        <div className="space-y-4 w-full h-max">
          <h1 className="text-xl md:text-2xl font-medium">
            {frequencyName === null ? `${id?.toUpperCase()}` : frequencyName}
          </h1>
          <div className="relative w-full h-72 md:h-96">
            <Image
              src={
                `${SUPABASE_URL}/storage/v1/object/public/airports/${id.toUpperCase()}.jpg` ||
                "/placeholder.png"
              }
              alt="Airport Image"
              layout="fill"
              objectFit="cover"
              className="w-full h-full rounded-xl mt-2"
            />
          </div>
          {frequency === null ? null : (
            <audio controls autoPlay className="rounded-lg w-full mt-10">
              <source src={frequency || ""} />
              Your browser does not support the audio element.
            </audio>
          )}
        </div>
        <div className="space-y-6 md:ml-8 min-w-fit">
          <h1 className="text-2xl font-medium">Frequency</h1>
          <div>
            <ul
              className={`overflow-y-scroll overflow-hidden frequency_height`}
            >
              {data.json.frequency?.map((element: any, i: number) => {
                return (
                  <li
                    key={i}
                    className="bg-gray-200 rounded-lg mb-4 p-2 border-2 border-gray-200 hover:border-2 hover:border-blue-400 min-w-max"
                  >
                    <button
                      onClick={() => {
                        setFrequency(element.audioLink),
                          setFrequencyName(element.name);
                      }}
                      disabled={element.status === "DOWN"}
                      className="text-left w-full"
                    >
                      <div className="grid grid-rows-4 grid-flow-col gap-2">
                        <h1 className="font-medium">{element.name}</h1>
                        <span>{element.frequency}</span>
                        <span>
                          Listeners:{" "}
                          {element.status === "DOWN" ? "0" : element.listeners}
                        </span>
                        <span>Status: {element.status}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Airport;
