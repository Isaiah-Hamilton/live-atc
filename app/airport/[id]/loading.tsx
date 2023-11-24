import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const Loading = () => {
  return (
    <>
      <div className="mt-5 mb-10">
        <Skeleton className="w-11 h-4" />
        <Skeleton className="w-[650px] h-7 mt-1.5" />
        <Skeleton className="w-32 h-3.5 mt-3" />
        <Separator className="mt-5" />
      </div>

      <div className="my-8 grid grid-cols-1 lg:grid-cols-10 gap-14">
        <div className="col-span-3">
          <h2 className="text-3xl font-semibold">Frequencies</h2>
          <div className='mt-8'>
            <div className='mt-5'>
              {[...Array(6)].map((_: any, i: number) => (
                <div className='w-80'>
                  <Skeleton className="w-64 h-4 mt-1.5" />
                  <Skeleton className="w-20 h-3 mt-3.5" />
                  <Separator className="mt-5 mb-4" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-7 h-fit hidden lg:block">
          <Tabs defaultValue="arrivals">
            <TabsList className="flex w-fit mx-auto mb-8">
              <TabsTrigger value="arrivals">Arrivals</TabsTrigger>
              <TabsTrigger value="departures">Departures</TabsTrigger>
            </TabsList>
            <TabsContent value="arrivals">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Flight</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Airline</TableHead>
                    <TableHead>Aircraft</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(10)].map((_: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell><Skeleton className='w-14 h-3' /></TableCell>
                      <TableCell><Skeleton className='w-12 h-3' /></TableCell>
                      <TableCell>
                        <Skeleton className='w-24 h-4' />
                      </TableCell>
                      <TableCell><Skeleton className='w-24 h-3' /></TableCell>
                      <TableCell><Skeleton className='w-8 h-3' /></TableCell>
                      <TableCell>
                        <Skeleton className='w-28 h-3' />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableCaption>
                  <Skeleton className='w-16 h-3' />
                </TableCaption>
              </Table>
            </TabsContent>
            <TabsContent value="departures">
              <div>Damn nigga wait</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default Loading
