import { Skeleton } from "@/components/ui/skeleton";
export function SkeletonLink() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="flex items-center gap-5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
}
