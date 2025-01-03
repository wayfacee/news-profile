import { Card, CardContent, CardHeader } from "@/shared/ui/Card";
import { Skeleton } from "@/shared/ui/Skeleton";
import { cn } from "@/shared/lib";

interface Props {
  className?: string;
}

export const ProfileCardSkeleton = ({ className }: Props) => {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <Skeleton className="h-5 w-72" />
        <Skeleton className="h-5 w-80" />
      </CardHeader>

      <CardContent>
        <CardContent className="space-y-4">
          {[...Array(2)].map((_, index) => (
            <div className="grid grid-cols-2 gap-4" key={index}>
              <div className="space-y-2">
                <Skeleton className="w-10 h-4" />
                <Skeleton className="w-52 h-9" />
              </div>

              <div className="space-y-2">
                <Skeleton className="w-10 h-4" />
                <Skeleton className="w-52 h-9" />
              </div>
            </div>
          ))}
        </CardContent>
      </CardContent>
    </Card>
  );
};
