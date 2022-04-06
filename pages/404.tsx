import { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Layout from '../components/Layouts'
import Header from '../components/Head'

const ErrorPage: NextPage = ({}) => {
  const [show404, setShow404] = useState<boolean>(false)

  useEffect(() => {
    setTimeout(() => {
      setShow404(true)
    }, 500)
  }, [])

  return (
    <>
      <Header title={'404 - Live ATC'} />
      <Layout hideHeader>
        <div className="w-full h-screen relative flex flex-col items-center justify-center mx-auto">
          <div className="absolute top-0 w-full max-w-7xl mx-auto pt-6 px-8 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <Link href="/">
                    <a className="flex items-center">
                      <Image src={'/live-atc.png'} alt="Live ATC logo" width={50} height={50} />
                      <span className="font-semibold">Live ATC</span>
                    </a>
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <div
            className={`transition flex flex-col space-y-6 items-center justify-center ${
              show404 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="w-[320px] flex flex-col items-center justify-center space-y-3">
              <h1 className="text-8xl font-bold">404</h1>
              <p className="text-center font-medium">
                We couldn&apos;t find the page that you&apos;re looking for!
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <a>
                  <button className="px-3 py-2 shadow-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg">
                    Head back
                  </button>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ErrorPage
