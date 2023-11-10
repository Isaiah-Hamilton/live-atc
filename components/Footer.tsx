import Link from "next/link";
import { TwitterIcon, GithubIcon } from "./Icons";

const Footer = () => {
  return (
    <footer className="w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto border-t border-gray-200">
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
              Airports
            </Link>
          </li>
          <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
            <Link
              className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800"
              href="#"
            >
              Services
            </Link>
          </li>
          <li className="inline-block relative pe-8 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-3 before:-translate-y-1/2 before:content-['/'] before:text-gray-300">
            <Link
              className="inline-flex gap-x-2 text-sm text-gray-500 hover:text-gray-800"
              href="#"
            >
              Blog
            </Link>
          </li>
        </ul>

        <div className="md:text-end space-x-2">
          <Link
            className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            href="https://twitter.com/isaiah7hamilton"
          >
            <TwitterIcon />
          </Link>
          <Link
            className="w-8 h-8 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
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
