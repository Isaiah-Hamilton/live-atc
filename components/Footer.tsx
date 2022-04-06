import Image from 'next/image'
import Link from 'next/link'
import { GitHubLogoIcon, HeartFilledIcon, TwitterLogoIcon } from '@radix-ui/react-icons'

const Footer = () => {
  return (
    <div className={`flex items-center justify-between pb-2 pr-3`}>
      <div className="flex items-center">
        <Image src="/live-atc.png" alt="Live ATC logo" width={50} height={50} />
        <span className="font-semibold">Live ATC</span>
      </div>
      <div className="hidden sm:block space-x-1">
        <span>Code with</span>
        <HeartFilledIcon className="inline-block text-red-500" width={20} height={20} />
        <span>by</span>
        <Link href="https://github.com/isaiah-hamilton">
          <a>Isaiah Hamilton</a>
        </Link>
      </div>
      <div className="flex space-x-4">
        <Link href="https://twitter.com/isaiah7hamilton">
          <a>
            <TwitterLogoIcon width={25} height={25} />
          </a>
        </Link>
        <Link href="https://github.com/isaiah-hamilton/live-atc">
          <a>
            <GitHubLogoIcon width={25} height={25} />
          </a>
        </Link>
      </div>
    </div>
  )
}

export default Footer
