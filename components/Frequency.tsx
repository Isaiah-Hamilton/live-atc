type Props = {
  data: any
}

const Frequency = (props: Props) => {
  const { data } = props

  return (
    <ul>
      {data.frequency.map((element: any, i: number) => {
        return (
          <li key={i} className="bg-gray-600 rounded-lg mb-4 p-2">
            <button onClick={() => {}}>
              <h1>{element.name}</h1>
              <div className="grid grid-rows-3 grid-flow-col gap-2">
                <span>{element.frequency}</span>
                <span>Status: {element.status}</span>
                <span>Listeners: {element.status === 'DOWN' ? '0' : element.listeners}</span>
              </div>
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Frequency
