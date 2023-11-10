import Link from "next/link";

type Props = {
  airport: any;
};

const AirportCard = (props: Props) => {
  const { airport } = props;
  return (
    <div key={airport.id}>
      <Link href={`/airport/${airport.id}`}>
        <div className="h-full py-4 px-5 rounded-xl border border-[#09131d]">
          <h3 className="text-xl font-semibold">{airport.id}</h3>
          <p className="font-medium">{airport.name}</p>
          <p className="text-sm">
            {airport?.city}, {airport?.region}
          </p>
        </div>
      </Link>
    </div>
  );
}

export default AirportCard;