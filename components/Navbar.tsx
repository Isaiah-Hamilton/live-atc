import Image from 'next/image'
import Link from 'next/link'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { AuthSession } from '@supabase/supabase-js'
import ThemeToggle from './ThemeToggle'
import { useRouter } from 'next/router'

type Props = {
  darkMode: boolean
  updateTheme: Function
}

const Nav = (props: Props, { session }: { session: AuthSession }) => {
  const { darkMode, updateTheme } = props
  const router = useRouter()
  const [search, setSearch] = useState<string>('')

  return (
    <div className="w-full relative flex justify-between h-16">
      <div className="flex-1 flex items-center justify-center sm:items-stretch lg:justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <a className="flex items-center">
              <Image src={'/live-atc.png'} alt="Live ATC logo" width={50} height={50} />
              <span className="font-semibold">Live ATC</span>
            </a>
          </Link>
          <Link href="/airport">
            <a className="hover:text-blue-500 transition duration-300 ease-in-out">Airports</a>
          </Link>
        </div>
        <div className="flex items-center m-4 space-x-2">
          <input
            className="w-full border dark:border-none dark:bg-gray-600 rounded-lg outline-none transition duration-100 p-2"
            placeholder="KATL"
            type="search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className="bg-blue-500 rounded-lg p-2"
            type="submit"
            onClick={() => router.push(`/airport/${search.toUpperCase()}`)}
          >
            <MagnifyingGlassIcon className="text-white" width={20} height={20} />
          </button>
        </div>
        <div className="hidden lg:flex items-center sm:space-x-3">
          <ThemeToggle darkMode={darkMode} updateTheme={updateTheme} />
        </div>
      </div>
    </div>
  )
}

export default Nav
