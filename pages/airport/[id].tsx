import { useState, useEffect } from "react";
import { NextPage } from "next";
import Layout from "@/components/Layout";
import { ArrivalsTable, DeparturesTable } from "@/components/Tables";
import { PlayIcon, PauseIcon, MuteIcon, MutedIcon } from "@/components/Icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

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
      <div className="mt-5">
        <p className="text-lg font-medium tracking-wide leading-none">
          {airport.id}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          {airport.name}
        </h1>
        <p>
          {airport.city}, {airport.region}
        </p>
        <Separator className="mb-10 mt-5" />
      </div>

      <div className="my-8 grid grid-cols-1 lg:grid-cols-10 gap-14">
        <div className="col-span-3">
          <h2 className="text-2xl font-medium mb-4">Frequencies</h2>
          <ScrollArea style={{ height: `${height - 64}px` }}>
            <div className="pr-4">
              <div className="mt-8" style={{ height: `${height - 64}px` }}>
                {frequencies?.length === 0 && (
                  <div>No Frequencies Found</div>
                )}
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
          <Tabs defaultValue="arrivals">
            <TabsList className="flex w-fit mx-auto mb-8">
              <TabsTrigger value="arrivals">Arrivals</TabsTrigger>
              <TabsTrigger value="departures">Departures</TabsTrigger>
            </TabsList>
            <TabsContent value="arrivals">
              <ArrivalsTable
                type={true}
                flightRadar={
                  flightRadar.airport.pluginData.schedule.arrivals.data
                }
              />
            </TabsContent>
            <TabsContent value="departures">
              <DeparturesTable
                type={false}
                flightRadar={
                  flightRadar.airport.pluginData.schedule.departures.data
                }
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {frequency.audio && (
        <div className="fixed inset-x-0 bottom-0 z-10">
          <Card className="w-1/2 mx-auto mb-4 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <audio id="audio" src={frequency.audio} />
                  <button onClick={() => handlePlayPause()}>
                    {!isPlaying ? <PlayIcon /> : <PauseIcon />}
                  </button>
                  {isPlaying ? <div>LIVE</div> : <div>PAUSED</div>}
                </div>
                <div className="text-lg font-medium">{frequency.name || "Select any Frequency"}</div>
                <button onClick={() => handleMute()}>
                  {!isMuted ? <MuteIcon /> : <MutedIcon />}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Layout>
  );
};

export default Airport;
