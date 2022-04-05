import Link from 'next/link'
import Layout from '../components/Layouts'

const About = () => {
  return (
    <Layout>
      <div className="text-center w-1/2 m-auto">
        <h1 className="text-5xl font-medium my-4">About</h1>
        <p className="text-lg">
          Live ATC is a side project that I built for the
          <Link href="https://supabase.com/blog/2022/04/01/hackathon-bring-the-func">
            <a className="text-blue-400 mx-1">Supabase hackathon</a>
          </Link>
          using the
          <Link href="https://github.com/isaiah-hamilton/atc-api">
            <a className="text-blue-400 ml-1">ATC API</a>
          </Link>
          . With Live ATC, you can listen to real time ATC audio.
        </p>
      </div>
    </Layout>
  )
}

export default About
