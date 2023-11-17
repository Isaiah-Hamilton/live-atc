import Link from "next/link";
import { useRouter } from "next/router";
import { buttonVariants } from "@/components/ui/button";
import { TwitterIcon, GithubIcon } from "./Icons";

const Footer = () => {
  const router = useRouter();
  const RandomAirport = async () => {
    const res = await fetch(`${process.env.API_URL}/api/airport`);
    const data = await res.json();
    const RandomAirport =
      data.airport[Math.floor(Math.random() * data.airport.length)];
    router.push(`/airport/${RandomAirport.id}`);
  };

  return (
    <footer className="w-full max-w-[85rem] py-4 px-4 sm:px-6 lg:px-8 mx-auto border-t border-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-5 text-center">
        <div>
          <Link className="flex-none text-xl font-semibold text-black" href="/">
            Live ATC
          </Link>
        </div>

        <ul className="text-center">
          <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
            <Link
              className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800"
              href="/airport"
            >
              All Airports
            </Link>
          </li>
          <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
            <button
              className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800"
              onClick={() => RandomAirport()}
            >
              Random Airport
            </button>
          </li>
        </ul>

        <div className="md:text-end space-x-2 text-neutral-500">
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="https://twitter.com/isaiah7hamilton"
          >
            <TwitterIcon />
          </Link>
          <Link
            className={buttonVariants({ variant: "ghost" })}
            href="https://github.com/isaiah-hamilton/live-atc"
          >
            <GithubIcon />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
