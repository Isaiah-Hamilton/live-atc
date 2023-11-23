import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

const Home = () => {
  return (
    <div className="w-fit mx-auto space-y-6">
      <div className="text-center space-y-1.5">
        <div className="text-5xl lg:text-7xl font-semibold space-y-1 tracking-tighter">
          <h1>Listen to Live</h1>
          <h1>Air Traffic Control</h1>
        </div>
        <p className="text-xl">Listen up to 1,000+ live Frequencies for free</p>
      </div>
      <div className="w-fit mx-auto flex items-center space-x-4 font-medium">
        <Link href="/airport" className={buttonVariants({ variant: 'default' })}>
          Listen Now
        </Link>
        <Link href="/" className={buttonVariants({ variant: 'outline' })}>
          Random Airport
        </Link>
      </div>
    </div>
  )
}

export default Home
