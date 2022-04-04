import { GetServerSideProps } from 'next'
import supabase from '../lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import Avatar from './Avatar'
import { useEffect, useState } from 'react'
import { Profile } from '../types/profile'
import { AuthSession } from '@supabase/supabase-js'

type Props = {
  darkMode: boolean
  updateTheme: Function
}

const Nav = (props: Props, { session }: { session: AuthSession }) => {
  const { darkMode } = props
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
    <div
      className={`flex justify-between items-center px-8 py-6 ${
        darkMode ? 'dark:bg-gray-800' : 'bg-white'
      }`}
    >
      <Link href="/">
        <a className="flex items-center space-x-2">
          <Image src="/favicon.ico" width={40} height={40} />
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
            Live ATC
          </span>
        </a>
      </Link>
      <div>
        <input
          type="text"
          placeholder="airport code"
          className="rounded-xl bg-gray-300 w-96 h-8 p-2"
        />
      </div>
      <div>
        <Link href="/account">
          <a>
            {avatar ? (
              <Avatar url={avatar} size={40} />
            ) : (
              <Image src={'/defaultAvatar.webp'} width={40} height={40} className="rounded-full" />
            )}
          </a>
        </Link>
        {/*<ThemeToggle darkMode={darkMode} updateTheme={updateTheme} />*/}
      </div>
    </div>
  )
}

export default Nav
