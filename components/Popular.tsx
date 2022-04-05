import Image from 'next/image'
import Link from 'next/link'

const Popular = () => {
  const popArray = ['KATL', 'KLAX', 'KSFO', 'KJFK']

  return (
    <>
      {popArray.map((element, i) => {
        return (
          <div className="hover:-translate-y-4 ease-in-out duration-300 m-4" key={i}>
            <Link href={`/airport/${element}`}>
              <a>
                <div className="relative w-80 h-64 overflow-hidden rounded-xl shadow-md bg-gray-100 dark:bg-gray-700">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/airports/${element}.jpg`}
                    alt="Airport Image"
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full brightness-50"
                  />
                  <div className="absolute bottom-0 inset-x-0 text-white text-4xl font-medium p-2">
                    {element}
                  </div>
                </div>
              </a>
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default Popular
