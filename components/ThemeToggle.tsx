interface Props {
  darkMode: boolean
  updateTheme: Function
}

function DarkModeToggle(props: Props) {
  const { darkMode, updateTheme } = props

  const toggleDarkMode = () => {
    localStorage.setItem('theme', (!darkMode).toString())
    updateTheme(!darkMode)
  }

  return (
    <div className="flex items-center">
      <button
        type="button"
        aria-pressed="false"
        className={`
                relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer 
                transition-colors ease-in-out duration-200 focus:outline-none ${
                  darkMode ? 'bg-dark-500' : 'bg-gray-200'
                } mx-5
              `}
        onClick={() => toggleDarkMode()}
      >
        <span className="sr-only">Toggle Theme</span>
        <span
          aria-hidden="true"
          className={`
                  ${darkMode ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 rounded-full
                  bg-white dark:bg-dark-700 shadow-lg transform ring-0 transition ease-in-out duration-200
                `}
        />
      </button>
    </div>
  )
}

export default DarkModeToggle
