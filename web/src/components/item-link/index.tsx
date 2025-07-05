import { Files, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import type { LinkProps } from "@/types/link";
import { Link, useNavigate } from "react-router";

interface ItemLinkProps {
  link: LinkProps;
  onDeleteLink: (linkId: string) => void;
}

export function ItemLink({ link, onDeleteLink }: ItemLinkProps) {
  const navigate = useNavigate();

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
        <Button
          variant={"link"}
          onClick={() => navigate(`/${link.id}`)}
          className="font-semibold text-sm text-[#2C46B1] hover:underline p-0 justify-start cursor-pointer"
        >
          {link.shortenedLink}
        </Button>
        <span className="text-[#4D505C] font-normal text-xs truncate lg:max-w-[230px] max-w-[130px]">
          {link.longUrl}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <span className="text-[#4D505C] font-normal text-xs">
          {link.clicks} acesso{link.clicks !== 1 ? "s" : ""}
        </span>
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
