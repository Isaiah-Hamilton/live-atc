import { useState, useEffect } from "react";
import { NextPage } from "next";
import Layout from "@/components/Layout";
import { ArrivalsTable, DeparturesTable } from "@/components/Table";
import { PlayIcon, PauseIcon, MuteIcon, MutedIcon } from "@/components/Icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const getServerSideProps = async (context: any) => {
  const params = context.params;
  const airportResponse = await fetch(
    `${process.env.API_URL}/api/airport/${params!.id}`,
  );
  const airportData = await airportResponse.json();

  const frequencyResponse = await fetch(
    `${process.env.API_URL}/api/airport/frequency/${params!.id}`,
  );
  const frequencyData = await frequencyResponse.json();

  const flightRadarResponse = await fetch(
    `https://api.flightradar24.com/common/v1/airport.json?code=${params!.id
    }&plugin[]=&plugin-setting[schedule][mode]=&plugin-setting[schedule][timestamp]=${new Date().getTime() / 1000
    }&page=1&limit=100&fleet=&token=`,
  );
  const flightRadarData = await flightRadarResponse.json();

  return {
    props: {
      airport: airportData.airport[0],
      frequencies: frequencyData.frequencies,
      flightRadar: flightRadarData.result.response,
    },
  };
};

const Airport: NextPage = ({ airport, frequencies, flightRadar }: any) => {
  const [height, setHeight] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [frequency, setFrequency] = useState({
    audio: "",
    name: "",
  });

  useEffect(() => {
    const divHeight = document.getElementById("targetHeight")?.clientHeight;
    if (divHeight) {
      setHeight(divHeight);
    }
  }, []);

  useEffect(() => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    if (audio) {
      audio.src = frequency.audio;
      audio.play();
    }
    setIsPlaying(true);
  }, [frequency]);

  const handlePlayPause = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    if (audio) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleMute = () => {
    const audio = document.getElementById("audio") as HTMLAudioElement;
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col xl:flex-row xl:item-center space-y-4 xl:space-y-0 bg-[#232c34] border border-[#09131d] rounded-xl text-white p-4 mt-4">
        <div className="w-full">
          <h2 className="text-sm text-gray-300">
            {airport.id.slice(1)}/{airport.id}
          </h2>
          <h1 className="text-2xl font-medium">{airport.name}</h1>
          <h2 className="text-gray-300">
            {airport.city}, {airport.region}
          </h2>
        </div>
        {frequency.audio && (
          <>
            <div className="h-[1px] xl:hidden bg-gray-300" />
            <div className="flex items-center justify-evenly w-full">
              <div className="flex items-center space-x-2">
                <audio id="audio" src={frequency.audio} />
                <button onClick={() => handlePlayPause()}>
                  {!isPlaying ? <PlayIcon /> : <PauseIcon />}
                </button>
                <div>LIVE</div>
              </div>
              <div className="text-lg font-medium">{frequency.name}</div>
              <button onClick={() => handleMute()}>
                {!isMuted ? <MuteIcon /> : <MutedIcon />}
              </button>
            </div>
          </>
        )}
      </div>
      <div className="my-8 grid grid-cols-1 lg:grid-cols-10 gap-14">
        <div className="col-span-3">
          <h2 className="text-2xl font-medium mb-4">Frequencies</h2>
          <ScrollArea style={{ height: `${height - 64}px` }}>
            <div className="pr-4">
              <div className="mt-8" style={{ height: `${height - 64}px` }}>
                {frequencies?.map((frequency: any) => {
                  const Frequency = frequency.frequency.toFixed(3);
                  return (
                    <>
                      <button
                        className="text-left w-full"
                        onClick={() => {
                          setFrequency({
                            audio: frequency.audio,
                            name: frequency.name,
                          });
                        }}
                        disabled={!frequency.status}
                      >
                        <h3 className="text-lg font-medium">
                          {frequency.name}
                        </h3>
                        <span className="text-sm text-neutral-500">
                          {Frequency}
                        </span>
                      </button>
                      <Separator className="my-4 last:hidden" />
                    </>
                  );
                })}
              </div>
            </div>
          </ScrollArea>
        </div>
        <div id="targetHeight" className="col-span-7 h-fit hidden lg:block">
          <h2 className="text-center text-2xl font-medium">Arrivals</h2>
          <ArrivalsTable
            type={true}
            flightRadar={flightRadar.airport.pluginData.schedule.arrivals.data}
          />
          <h2 className="text-center text-2xl font-medium mt-16">Departures</h2>
          <DeparturesTable
            type={false}
            flightRadar={
              flightRadar.airport.pluginData.schedule.departures.data
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default Airport;
