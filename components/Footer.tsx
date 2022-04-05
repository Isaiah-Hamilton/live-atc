import Link from 'next/link'

type Props = {
  darkMode: boolean
}

const Footer = (props: Props) => {
  const { darkMode } = props

  return (
    <div className={`flex justify-between px-8 pb-2`}>
      <div>
        <span>Made by </span>
        <Link href="https://github.com/isaiah-hamilton">
          <a>Isaiah Hamilton</a>
        </Link>
      </div>
      <div>
        <span>Source code available on </span>
        <Link href="https://github.com/isaiah-hamilton/live-atc">
          <a>GitHub</a>
        </Link>
      </div>
    </div>
  )
}

export default Footer
