import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { MenuIcon } from "./Icons";
import { Input } from "@/components/ui/input"

const Nav = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");

  const handleInputChange = (event: any) => {
    setSearch(event.target.value);
  };

  const handleInputEnter = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push(`/search?id=${search}`);
    }
  };

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-3">
      <nav className="relative max-w-[85rem] w-full mx-auto sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <Link className="flex-none text-xl font-semibold" href="/">
            Live ATC
          </Link>
          <div className="sm:hidden">
            <button className="w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none">
              <MenuIcon />
            </button>
          </div>
        </div>
        <div className="hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
          <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
            <Link
              className="font-medium text-neutral-500 hover:text-neutral-800"
              href="/airport"
            >
              Airports
            </Link>

            <div className="flex items-center gap-x-2 sm:ms-auto">
              <Input
                className="m-1"
                type="search"
                value={search}
                placeholder="Search icao"
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => handleInputEnter(e)}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
