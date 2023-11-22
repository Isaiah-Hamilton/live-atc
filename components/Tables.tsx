import { useState } from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const formatTime = (time: number) => {
  const date = new Date(time * 1000);
  let hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  let PM = false;

  if (hours > 12) {
    PM = true;
    hours -= 12;
  } else if (hours === 0) {
    hours = 12;
  }

  const formattedTime = `${hours}:${minutes.substr(-2)} ${PM ? "PM" : "AM"}`;
  return formattedTime;
};

const ArrivalsTable = (props: any) => {
  const [count, setCount] = useState(10);
  const { flightRadar } = props;

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
        {flightRadar.slice(0, count).map((item: any) => (
          <TableRow key={item.flight.time.scheduled.arrival}>
            <TableCell>
              {formatTime(item.flight.time.scheduled.arrival)}
            </TableCell>
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
              {item.flight.status.generic.status.text}{" "}
              {formatTime(item.flight.status.generic.eventTime.utc)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>
        <button
          className="hover:text-neutral-800"
          onClick={() => setCount(count + 10)}
        >
          See More
        </button>
      </TableCaption>
    </Table>
  );
};

const DeparturesTable = (props: any) => {
  const [count, setCount] = useState(10);
  const { flightRadar } = props;

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
        {flightRadar.slice(0, count).map((item: any) => (
          <TableRow key={item.flight.time.scheduled.departure}>
            <TableCell>
              {formatTime(item.flight.time.scheduled.departure)}
            </TableCell>
            <TableCell>{item.flight.identification.callsign}</TableCell>
            <TableCell>
              <span>
                {item.flight.airport.destination.position.region.city}{" "}
              </span>
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
              {item.flight.status.generic.status.text}{" "}
              {formatTime(item.flight.status.generic.eventTime.utc)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableCaption>
        <button
          className="hover:text-neutral-800"
          onClick={() => setCount(count + 10)}
        >
          See More
        </button>
      </TableCaption>
    </Table>
  );
};

export { ArrivalsTable, DeparturesTable };
