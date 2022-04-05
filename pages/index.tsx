import type { NextPage } from 'next'
import Layout from '../components/Layouts'
import Feature from '../components/Feature'
import Popular from '../components/Popular'

const Home: NextPage = () => {
  return (
    <Layout>
      <Feature />
      <div className="mt-10">
        <h1 className="text-4xl font-medium">Popular</h1>
        <div className="flex justify-between items-center py-8 overflow-x-scroll -ml-4">
          <Popular />
        </div>
      </div>
    </Layout>
  )
}

export default Home
