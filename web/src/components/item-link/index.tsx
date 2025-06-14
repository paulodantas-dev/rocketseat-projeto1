import { Files, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import type { LinkProps } from "@/types/link";

interface ItemLinkProps {
  link: LinkProps;
  onDeleteLink: (linkId: string) => void;
}

export function ItemLink({ link, onDeleteLink }: ItemLinkProps) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Link copiado com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao copiar o link.");
      });
  };
  return (
    <div key={link.id} className="flex items-center justify-between ">
      <div className="flex flex-col">
        <span className="font-semibold text-sm text-[#2C46B1]">
          {link.shortenedLink}
        </span>
        <span className="text-[#4D505C] font-normal text-xs">
          {link.longUrl}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-[#4D505C] font-normal text-xs">10 acessos</span>
        <div className="flex items-center gap-1">
          <Button
            size={"icon"}
            variant={"secondary"}
            className="cursor-pointer"
            onClick={() => copyToClipboard(link.shortenedLink)}
          >
            <Files />
          </Button>
          <Button
            size={"icon"}
            variant={"secondary"}
            className="cursor-pointer"
            onClick={() => {
              onDeleteLink(link.id);
            }}
          >
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
}
