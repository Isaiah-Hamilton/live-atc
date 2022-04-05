import supabase from '../lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import Avatar from './Avatar'
import { useEffect, useState } from 'react'
import { Profile } from '../types/profile'
import { AuthSession } from '@supabase/supabase-js'
import ThemeToggle from './ThemeToggle'

type Props = {
  darkMode: boolean
  updateTheme: Function
}

const Nav = (props: Props, { session }: { session: AuthSession }) => {
  const { darkMode, updateTheme } = props
  const [avatar, setAvatar] = useState<string | null>(null)

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
              <Image src={'/favicon.ico'} alt="Logo" width={20} height={20} />
              <span className="ml-2 font-semibold">Live ATC</span>
            </a>
          </Link>
          <Link href="/how-it-works">
            <a className="hover:text-blue-500 transition duration-300 ease-in-out">How it works</a>
          </Link>
          <Link href="/feature">
            <a className="hover:text-blue-500 transition duration-300 ease-in-out">Feature</a>
          </Link>
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
