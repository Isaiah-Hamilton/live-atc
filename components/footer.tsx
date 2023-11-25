import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { Separator } from './ui/separator'
import { GithubIcon, TwitterIcon } from 'lucide-react'

const Footer = ({ RandomAirport }: any) => {
  return (
    <footer className="w-full mt-20 mb-4 mx-auto">
      <Separator />
      <div className="flex items-center justify-between text-center pt-2">
        <div>
          <Link className="flex-none text-xl font-semibold" href="/">
            Live ATC
          </Link>
        </div>

        <div className="md:text-end space-x-2">
          <Link
            className={buttonVariants({ variant: 'ghost' })}
            href="https://twitter.com/isaiah7hamilton"
          >
            <TwitterIcon className="h-[1.2rem] w-[1.2rem]" strokeWidth={1} />
          </Link>
          <Link
            className={buttonVariants({ variant: 'ghost' })}
            href="https://github.com/isaiah-hamilton/live-atc"
          >
            <GithubIcon className="h-[1.2rem] w-[1.2rem]" strokeWidth={1} />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
