import supabase from '../lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import Avatar from './Avatar'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'
import { Profile } from '../types/profile'
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
  const [avatar, setAvatar] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    getAvatar()
  }, [session])

  const setAvatarURL = async (profile: Profile) => {
    setAvatar(profile.avatar_url)
  }

  const getAvatar = async () => {
    const user = supabase.auth.user()
    let { data, error } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', user!.id)
      .single()

    if (error) {
      throw error
    }

    setAvatarURL(data)
  }

  return (
    <div className="lg:container mx-auto relative flex justify-between h-16">
      <div className="flex-1 flex items-center justify-center sm:items-stretch lg:justify-between">
        <div className="flex items-center space-x-6">
          <Link href="/">
            <a className="flex items-center">
              <Image src={'/live-atc.png'} alt="Live ATC logo" width={50} height={50} />
              <span className="font-semibold">Live ATC</span>
            </a>
          </Link>
          <Link href="/about">
            <a className="hover:text-blue-500 transition duration-300 ease-in-out">About</a>
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
          <Link href={avatar ? '/account' : '/auth/signin'}>
            <a>
              {avatar ? (
                <Avatar url={avatar} size={40} />
              ) : (
                <div className="px-3 py-1 shadow-sm text-white ease-in-out duration-300 bg-blue-500 hover:bg-blue-600 rounded-md">
                  Sign In
                </div>
              )}
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Nav
