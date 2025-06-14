import { Link } from "lucide-react";
import { Separator } from "../ui/separator";

export function EmptyLinks() {
  return (
    <div className="flex flex-col gap-4">
      <Separator orientation="horizontal" />

      <div className="flex flex-col items-center gap-2 p-6">
        <Link />
        <span className="text-[#4D505C] text-xs font-normal uppercase">
          ainda não existem links cadastrados
        </span>
      </div>
    </div>
  );
}
