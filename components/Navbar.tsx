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
      event.preventDefault();
			router.push(`/search?airport=${search}`)
    }
	}

  return (
    <div className="flex items-center justify-between mx-8 my-4">
			<div className='flex items-center space-x-4'>
				<div className='font-semibold'>
					<Link href='/'>Live ATC</Link>
				</div>
				<div>
					<Link href='/airport'>Airports</Link>
				</div>
			</div>
			<div className='relative'>
				<label htmlFor="Search" className="sr-only">Search Airports</label>
				<input
					id='Search'
					className="w-full border dark:border-none dark:bg-gray-100 rounded-lg outline-none transition duration-100 p-2"
          placeholder="search airport"
          type="search"
					value={search}
          onChange={(e) => handleInputChange(e)}
					onKeyDown={(e) => handleInputEnter(e)}
        />
			</div>
    </div>
  )
}

export default Nav
