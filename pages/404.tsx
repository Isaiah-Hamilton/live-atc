import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'

const ErrorPage: NextPage = () => {
  const router = useRouter()

  return (
    <Layout hideNavbar hideFooter>
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center mx-auto text-center">
          <p className="p-3 text-sm font-medium text-blue-500 rounded-full bg-blue-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800 md:text-3xl">Page Not Found</h1>
          <p className="mt-4 text-gray-500">
            The page you are looking for doesn&apos;t exist. Here are some helpful links:
          </p>

          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button
              onClick={() => {
                router.back()
              }}
              className="flex items-center justify-center w-1/2 px-5 py-2 text-sm gap-x-2 sm:w-auto bg-[#232c34] border border-[#09131d] rounded-xl text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-5 h-5 rtl:rotate-180"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                />
              </svg>
              <span>Go back</span>
            </button>

            <Link
              href="/"
              className="w-1/2 px-5 py-2 text-sm tracking-wide shrink-0 sm:w-auto border border-[#09131d] rounded-xl text-[#232c34]"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ErrorPage