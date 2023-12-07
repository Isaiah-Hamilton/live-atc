'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'

const SearchPage = () => {
  const [search, setSearch] = useState<any>({})
  const searchParams = useSearchParams()
  const keyword = searchParams.get('keyword')

  useEffect(() => {
    fetch(`/api/search?keyword=${keyword}`)
      .then((res) => res.json())
      .then((search) => {
        setSearch(search)
      })
  }, [keyword])

  return (
    <>
      <h1 className="text-4xl font-semibold mt-8 mb-6">Search: {keyword}</h1>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {search.search?.map((airport: any) => (
          <Card key={airport.id}>
            <Link href={`/airport/${airport.id}`}>
              <CardHeader>
                <CardTitle>{airport.id}</CardTitle>
                <CardDescription className="text-lg">{airport.name}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {airport?.city}, {airport?.region}
                </p>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </>
  )
}

export default SearchPage
