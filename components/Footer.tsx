import Link from 'next/link'

const Footer = () => {
  return (
    <div className={`flex items-center justify-between pb-2 pr-3`}>
      <div className="flex items-center">
        <Link href="/" className="font-semibold">
          Live ATC
        </Link>
      </div>
      <div className="hidden sm:block space-x-1">
        <span>Code by</span>
        <Link href="https://github.com/isaiah-hamilton">Isaiah Hamilton</Link>
      </div>
      <div className="flex space-x-4">
        <Link href="https://twitter.com/isaiah7hamilton">Twitter</Link>
        <Link href="https://github.com/isaiah-hamilton/live-atc">Github</Link>
      </div>
    </div>
  )
}

export default Footer
