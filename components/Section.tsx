type Props = {
  children: React.ReactNode
}

const Section = (props: Props) => {
  const { children } = props

  return <div className="container mx-auto relative py-10">{children}</div>
}

export default Section
