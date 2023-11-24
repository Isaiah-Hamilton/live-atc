'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { PlayIcon, SquareIcon, VolumeX, Volume2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const Frequencies = ({ frequencies, setFrequency }: any) => {
  return (
    <ScrollArea className="h-[685px] mt-8">
      <div className="mt-5 pr-4">
        {frequencies?.length === 0 && <div>No Frequencies Found</div>}
        {frequencies?.map((frequency: any) => {
          const Frequency = frequency.frequency.toFixed(3)
          return (
            <>
              <button
                className="text-left w-full"
                onClick={() => {
                  setFrequency({
                    audio: frequency.audio,
                    name: frequency.name,
                  })
                }}
                disabled={!frequency.status}
              >
                <h3 className="text-lg font-medium">{frequency.name}</h3>
                <span className="text-sm text-neutral-500">{Frequency}</span>
              </button>
              <Separator className="my-4 last:hidden" />
            </>
          )
        })}
      </div>
    </ScrollArea>
  )
}

const formatTime = (time: number) => {
  const date = new Date(time * 1000)
  let hours = date.getHours()
  const minutes = '0' + date.getMinutes()
  let PM = false

  if (hours > 12) {
    PM = true
    hours -= 12
  } else if (hours === 0) {
    hours = 12
  }

  return `${hours}:${minutes.substr(-2)} ${PM ? 'PM' : 'AM'}`
}

const ArrivalsTable = ({ arrivals }: any) => {
  const [count, setCount] = useState(10)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Flight</TableHead>
          <TableHead>From</TableHead>
          <TableHead>Airline</TableHead>
          <TableHead>Aircraft</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {arrivals.arrivals.slice(0, count).map((item: any) => (
          <TableRow key={item.flight.time.scheduled.arrival}>
            <TableCell>{formatTime(item.flight.time.scheduled.arrival)}</TableCell>
            <TableCell>{item.flight.identification.callsign}</TableCell>
            <TableCell>
              <span>{item.flight.airport.origin.position.region.city} </span>
              <Link
                href={item.flight.airport.origin.code.icao}
                className="text-indigo-500 cursor-pointer"
              >
                ({item.flight.airport.origin.code.iata})
              </Link>
            </TableCell>
            <TableCell>{item.flight.airline?.short}</TableCell>
            <TableCell>{item.flight.aircraft.model.code}</TableCell>
            <TableCell>
              {item.flight.status.generic.status.text}{' '}
              {formatTime(item.flight.status.generic.eventTime.utc)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>
        <button className="hover:text-neutral-800" onClick={() => setCount(count + 10)}>
          See More
        </button>
      </TableCaption>
    </Table>
  )
}

const DeparturesTable = ({ departures }: any) => {
  const [count, setCount] = useState(10)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Time</TableHead>
          <TableHead>Flight</TableHead>
          <TableHead>To</TableHead>
          <TableHead>Airline</TableHead>
          <TableHead>Aircraft</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {departures.departures.slice(0, count).map((item: any) => (
          <TableRow key={item.flight.time.scheduled.departure}>
            <TableCell>{formatTime(item.flight.time.scheduled.departure)}</TableCell>
            <TableCell>{item.flight.identification.callsign}</TableCell>
            <TableCell>
              <span>{item.flight.airport.destination.position.region.city} </span>
              <Link
                href={item.flight.airport.destination.code.icao}
                className="text-indigo-500 cursor-pointer"
              >
                ({item.flight.airport.destination.code.iata})
              </Link>
            </TableCell>
            <TableCell>{item.flight.airline?.short}</TableCell>
            <TableCell>{item.flight.aircraft.model.code}</TableCell>
            <TableCell>
              {item.flight.status.generic.status.text}{' '}
              {formatTime(item.flight.status.generic.eventTime.utc)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>
        <button className="hover:text-neutral-800" onClick={() => setCount(count + 10)}>
          See More
        </button>
      </TableCaption>
    </Table>
  )
}

const AirportPage = ({ frequencies, arrivals, departures }: any) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [frequency, setFrequency] = useState({ audio: '', name: '' })

  useEffect(() => {
    const audio = document.getElementById('audio') as HTMLAudioElement
    if (audio) {
      audio.src = frequency.audio
      audio.play()
    }
    setIsPlaying(true)
  }, [frequency])

  const handlePlayPause = () => {
    const audio = document.getElementById('audio') as HTMLAudioElement
    if (audio) {
      if (audio.paused) {
        audio.play()
        setIsPlaying(true)
      } else {
        audio.pause()
        setIsPlaying(false)
      }
    }
  }

  const handleMute = () => {
    const audio = document.getElementById('audio') as HTMLAudioElement
    if (audio) {
      audio.muted = !audio.muted
      setIsMuted(!isMuted)
    }
  }

  return (
    <>
      <div className="flex items-start justify-between">
        <div className="mt-1">
          <h2 className="text-3xl font-semibold">Frequencies</h2>
          <Frequencies frequencies={frequencies} setFrequency={setFrequency} />
        </div>
        <div>
          <Tabs defaultValue="arrivals">
            <TabsList className="flex w-fit mx-auto mb-8">
              <TabsTrigger value="arrivals">Arrivals</TabsTrigger>
              <TabsTrigger value="departures">Departures</TabsTrigger>
            </TabsList>
            <TabsContent value="arrivals">
              <ArrivalsTable arrivals={arrivals} />
            </TabsContent>
            <TabsContent value="departures">
              <DeparturesTable departures={departures} />
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
                    {!isPlaying ? <PlayIcon /> : <SquareIcon />}
                  </button>
                  <div className="ml-2">{isPlaying ? <div>LIVE</div> : <div>PAUSED</div>}</div>
                </div>
                <div className="text-lg font-medium">
                  {frequency.name || 'Select any Frequency'}
                </div>
                <button onClick={() => handleMute()}>{!isMuted ? <Volume2 /> : <VolumeX />}</button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default AirportPage
