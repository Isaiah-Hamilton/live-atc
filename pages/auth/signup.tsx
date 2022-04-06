import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import supabase from '../../lib/supabase'
import Layout from '../../components/Layouts'

const SignUp: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signUpWithEmail = async (email: string, password: string) => {
    setLoading(true)
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    })
    setLoading(false)
  }

  return (
    <Layout hideHeader>
      <div className="pl-20 pt-5">
        <Link href="/">
          <a className="flex items-center">
            <Image src={'/live-atc.png'} alt="Live ATC logo" width={50} height={50} />
            <span className="font-semibold">Live ATC</span>
          </a>
        </Link>
      </div>
      <div className="dark:bg-dark-800 dark:text-white text-gray-800">
        <div className="pt-6">
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-center mb-4 md:mb-8">Sign Up</h2>

            <div className="max-w-lg border border-gray-300 dark:border-gray-600 rounded-lg mx-auto">
              <div className="flex flex-col gap-4 p-4 md:p-8">
                <div>
                  <label htmlFor="email" className="inline-block text-sm sm:text-base mb-2">
                    Email
                  </label>
                  <input
                    className="w-full border dark:border-none dark:bg-gray-600 focus:ring ring-blue-400 rounded-lg outline-none transition duration-100 px-3 py-2"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="inline-block text-sm sm:text-base mb-2">
                    Password
                  </label>
                  <input
                    className="w-full border dark:border-none dark:bg-gray-600 focus:ring ring-blue-400 rounded-lg outline-none transition duration-100 px-3 py-2"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  className="block bg-blue-500 hover:bg-blue-600 active:bg-gray-600 text-white focus-visible:ring ring-gray-300 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3 mt-4"
                  onClick={(e) => {
                    e.preventDefault()
                    signUpWithEmail(email, password)
                  }}
                  disabled={loading}
                >
                  <span>{loading ? 'Loading' : 'Sign Up'}</span>
                </button>

                <div className="flex flex-row w-full items-center justify-center">
                  <div className="w-full h-0.5 bg-gray-400 rounded-lg" />
                  <p className="w-full text-center dark:text-white text-gray-400">
                    or sign up with
                  </p>
                  <div className="w-full h-0.5 bg-gray-400 rounded-lg" />
                </div>

                <button className="flex justify-center items-center bg-gray-900 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 gap-2 px-8 py-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 256 249"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="xMinYMin meet"
                  >
                    <g fill="#ffffff">
                      <path d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0" />
                      <path d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398" />
                    </g>
                  </svg>
                  <span>Sign Up with Github</span>
                </button>
              </div>

              <div className="flex justify-center items-center pb-4">
                <p className="text-sm text-center">
                  Have an account?
                  <Link href="/auth/signin">
                    <a className="text-blue-400 hover:text-blue-500 active:text-blue-500 transition duration-100 ml-1">
                      Sign In
                    </a>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default SignUp
