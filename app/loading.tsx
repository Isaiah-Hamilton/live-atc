import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const Loading = () => {
  return (
    <>
      <div className="w-fit mx-auto space-y-6">
        <div className="text-center space-y-1.5">
          <div className="text-5xl lg:text-7xl font-semibold space-y-1 tracking-tighter">
            <h1>Listen to Live</h1>
            <h1>Air Traffic Control</h1>
          </div>
          <p className="text-xl">Listen to 1,000+ Live Frequencies For Free</p>
        </div>
        <div className="w-fit mx-auto flex items-center space-x-4 font-medium">
          <Button>Listen Now</Button>
          <Button variant="outline">Random Airport</Button>
        </div>
      </div>

      <h1 className="text-4xl font-semibold">Popular</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 py-8">
        {[...Array(6)].map((_: any, i: number) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle>
                <Skeleton className="w-16 h-5" />
              </CardTitle>
              <CardDescription>
                <Skeleton className="w-72 h-5" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="w-24 h-3.5" />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  )
}

export default Loading
