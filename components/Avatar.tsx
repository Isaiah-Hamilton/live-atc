import Image from 'next/image'
import { useEffect, useState } from 'react'
import supabase from '../lib/supabase'

export default function Avatar({ url, size }: { url: string | null; size: number }) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  useEffect(() => {
    if (url) downloadImage(url)
  }, [url])

  async function downloadImage(path: string) {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) {
        throw error
      }
      // @ts-ignore
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  return avatarUrl ? (
    <Image src={avatarUrl} className="rounded-full" width={size} height={size} />
  ) : (
    <div className="" style={{ height: size, width: size }} />
  )
}
