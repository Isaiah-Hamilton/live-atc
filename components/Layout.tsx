import Navbar from './Navbar'
import Footer from './Footer'

type Props = {
  hideNavbar?: boolean
  hideFooter?: boolean
  children: React.ReactNode
}

const Layout = (props: Props) => {
  const { hideNavbar = false, hideFooter = false, children } = props

  return (
    <div className="bg-white text-gray-800 min-h-screen px-7 flex flex-col">
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  )
}

export default Layout
