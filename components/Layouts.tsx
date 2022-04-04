import { useState, useEffect } from 'react'
import Nav from './Nav'
import Footer from './Footer'

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
    <div>
      {!hideHeader && <Nav darkMode={darkMode} updateTheme={updateTheme} />}
      <main
        className={`${darkMode ? 'dark:bg-gray-800' : 'bg-white'} ${
          darkMode ? 'dark:text-white' : 'text-black'
        } h-screen px-8`}
      >
        {children}
      </main>
      {!hideFooter && <Footer darkMode={darkMode} />}
    </div>
  )
}

export default Layout
