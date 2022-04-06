import supabase from '../../lib/supabase'
import { Profile } from '../../types/profile'
import { AuthSession } from '@supabase/supabase-js'
import { ChangeEvent, useEffect, useState } from 'react'
import Avatar from '../../components/Avatar'
import Layout from '../../components/Layouts'
import UploadButton from '../../components/UploadButton'
import Image from 'next/image'
import Header from '../../components/Head'

const Account = ({ session }: { session: AuthSession }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const [uploading, setUploading] = useState<boolean>(false)
  const [avatar, setAvatar] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)

  useEffect(() => {
    getProfile()
  }, [session])

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) console.log('Error logging out:', error.message)
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.'
      }

      const user = supabase.auth.user()
      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      // TODO: get rid of @ts-ignore
      // @ts-ignore
      const fileName = `${session?.user.id}${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      let { error: updateError } = await supabase.from('profiles').upsert({
        id: user!.id,
        avatar_url: filePath,
      })

      if (updateError) {
        throw updateError
      }

      setAvatar(null)
      setAvatar(filePath)
    } catch (error) {
      alert(error)
    } finally {
      setUploading(false)
    }
  }

  function setProfile(profile: Profile) {
    setAvatar(profile.avatar_url)
    setUsername(profile.username)
    setWebsite(profile.website)
  }

  async function getProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user!.id)
        .single()

      if (error) {
        throw error
      }

      setProfile(data)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile() {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user!.id,
        username,
        website,
        updated_at: new Date(),
      }

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error)
    } finally {
      setLoading(false)
    }
  }

  async function downloadImage(path: string) {
    const { error, data } = await supabase.storage.from('avatars').download(path)
    if (error) {
      throw error
    } else {
      // @ts-ignore
      const url = URL.createObjectURL(data)
      setAvatar(url)
    }
  }

  return (
    <>
      <Header title={'Account - Live ATC'} />
      <Layout>
        <h1 className="mb-10 text-center text-5xl font-medium">Account</h1>
        <div className="w-fit m-auto space-y-2">
          {avatar ? (
            <Avatar url={avatar} size={100} />
          ) : (
            <Image
              src={avatar || '/defaultAvatar.webp'}
              alt="Avatar"
              width={100}
              height={100}
              className="rounded-full"
            />
          )}
          <UploadButton onUpload={uploadAvatar} loading={uploading} />
        </div>
        <div className="grid justify-items-center my-4 space-y-8">
          <div>
            <label className="inline-block text-sm sm:text-base mb-2" htmlFor="avatar">
              Avatar Url
            </label>
            <input
              className="w-full border dark:border-none dark:bg-gray-600 focus:ring ring-blue-400 rounded-lg outline-none transition duration-100 px-3 py-2"
              id="avatar"
              type="url"
              value={avatar || ''}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
          <div>
            <label className="inline-block text-sm sm:text-base mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="w-full border dark:border-none dark:bg-gray-600 focus:ring ring-blue-400 rounded-lg outline-none transition duration-100 px-3 py-2"
              id="username"
              type="text"
              value={username || ''}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div>
            <label className="inline-block text-sm sm:text-base mb-2" htmlFor="website">
              Website
            </label>
            <input
              className="w-full border dark:border-none dark:bg-gray-600 focus:ring ring-blue-400 rounded-lg outline-none transition duration-100 px-3 py-2"
              id="website"
              type="website"
              value={website || ''}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 rounded-lg px-4 py-2 hover:bg-blue-600 ease-in-out duration-300"
              onClick={() => updateProfile()}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>
          <div>
            <button
              className="bg-red-500 rounded-lg px-4 py-2 hover:bg-red-400 ease-in-out duration-300"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Account
