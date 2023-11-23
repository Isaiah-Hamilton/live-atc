import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator"

const Loading = () => {
  return (
    <div className="mt-5">
      <Skeleton className="w-[45px] h-[15px] mt-[1.5px]" />
      <Skeleton className="w-[650px] h-[28px] mt-[7px]" />
      <Skeleton className="w-[120px] h-[14px] mt-[11px]" />
      <Separator className="mb-10 mt-[25.5px]" />
    </div>
  )
}

export default Loading