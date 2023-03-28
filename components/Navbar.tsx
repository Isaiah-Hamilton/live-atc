import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Nav = () => {
  const router = useRouter()
  const [search, setSearch] = useState<string>('')

  const handleInputChange = (event: any) => {
    setSearch(event.target.value)
  }

  const handleInputEnter = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      router.push(`/search?keyword=${search}`)
    }
  }

  return (
    <div className="flex items-center justify-between my-4">
      <div className="flex items-center space-x-4">
        <div className="font-semibold">
          <Link href="/">Live ATC</Link>
        </div>
        <div>
          <Link href="/airport">Airports</Link>
        </div>
      </div>
      <div>
        <input
          type="search"
          value={search}
          placeholder="Search..."
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleInputEnter(e)}
          className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
        />
      </div>
    </div>
  )
}

export default Nav
