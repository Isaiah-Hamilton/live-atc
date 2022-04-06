import { useState, useEffect } from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

type Props = {
  hideHeader?: boolean
  hideFooter?: boolean
  children: React.ReactNode
}

const Layout = (props: Props) => {
  const { hideHeader = false, hideFooter = false, children } = props
  const [darkMode, setDarkMode] = useState<boolean>(true)

  useEffect(() => {
    const isDarkMode = localStorage.getItem('theme')
    if (isDarkMode) {
      setDarkMode(isDarkMode === 'true')
      document.documentElement.className = isDarkMode === 'true' ? 'dark' : ''
    }
  }, [])

  const updateTheme = (isDarkMode: boolean) => {
    document.documentElement.className = isDarkMode ? 'dark' : ''
    setDarkMode(isDarkMode)
  }

  return (
    <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white min-h-screen px-8">
      {!hideHeader && <Navbar darkMode={darkMode} updateTheme={updateTheme} />}
      <main>{children}</main>
      {!hideFooter && <Footer />}
    </div>
  )
}

export default Layout
