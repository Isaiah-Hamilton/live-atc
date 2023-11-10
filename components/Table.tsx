import Link from "next/link";

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
  const { flightRadar } = props;

  return (
    <div className="text-left mt-8">
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-6 gap-4 mb-0.5 text-xs text-gray-400">
          <div>TIME</div>
          <div>FLIGHT</div>
          <div>FROM</div>
          <div>AIRLINE</div>
          <div>AIRCRAFT</div>
          <div>STATUS</div>
        </div>
      </div>
      <div>
        {flightRadar
          .slice(0, 10)
          .map((element: any) => {
            return (
              <div
                key={element.flight.time.scheduled.arrival}
                className="grid grid-cols-6 gap-4 border-b border-gray-200 last:border-none text-sm py-1.5"
              >
                <div>{formatTime(element.flight.time.scheduled.arrival)}</div>
                <div>{element.flight.identification.callsign}</div>
                <div>
                  <span>{element.flight.airport.origin.position.region.city} </span>
                  <Link
                    href={element.flight.airport.origin.code.icao}
                    className="text-blue-500 cursor-pointer"
                  >
                    ({element.flight.airport.origin.code.iata})
                  </Link>
                </div>
                <div>{element.flight.airline.short}</div>
                <div>{element.flight.aircraft.model.code}</div>
                <div>
                  {element.flight.status.generic.status.text}{" "}
                  {formatTime(element.flight.status.generic.eventTime.utc)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  )
}

const DeparturesTable = (props: any) => {
  const { flightRadar } = props;

  return (
    <div className="text-left mt-8">
      <div className="border-b border-gray-200">
        <div className="grid grid-cols-6 gap-4 mb-0.5 text-xs text-gray-400">
          <div>TIME</div>
          <div>FLIGHT</div>
          <div>TO</div>
          <div>AIRLINE</div>
          <div>AIRCRAFT</div>
          <div>STATUS</div>
        </div>
      </div>
      <div>
        {flightRadar
          .slice(0, 10)
          .map((element: any) => {
            return (
              <div
                key={element.flight.time.scheduled.departure}
                className="grid grid-cols-6 gap-4 border-b border-gray-200 last:border-none text-sm py-1.5"
              >
                <div>{formatTime(element.flight.time.scheduled.departure)}</div>
                <div>{element.flight.identification.callsign}</div>
                <div>
                  <span>
                    {element.flight.airport.destination.position.region.city}{" "}
                  </span>
                  <Link
                    href={element.flight.airport.destination.code.icao}
                    className="text-blue-500 cursor-pointer"
                  >
                    ({element.flight.airport.destination.code.iata})
                  </Link>
                </div>
                <div>{element.flight.airline?.short}</div>
                <div>{element.flight.aircraft.model.code}</div>
                <div>
                  {element.flight.status.generic.status.text}{" "}
                  {formatTime(element.flight.status.generic.eventTime.utc)}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  )
}

export { ArrivalsTable, DeparturesTable }