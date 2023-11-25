import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const Loading = () => {
  return (
    <>
      <h1 className="text-4xl font-semibold mt-8 mb-6">Airports</h1>
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_: any, i: number) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-[62px] h-[18px]" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-[310px] h-[15px]" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="w=[154px] h-[12px]" />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Loading
