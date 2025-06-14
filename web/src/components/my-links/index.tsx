import type { LinkProps } from "@/types/link";
import { toast } from "sonner";
import { useState } from "react";
import { ConfirmDeleteLinkDialog } from "../confirm-delete-link-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmptyLinks } from "../empty-links";
import { ItemLink } from "../item-link";
import { deleteLink } from "@/services/delete-link";

export function MyLinks({ links }: { links: LinkProps[] | undefined }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [linkId, setLinkId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const deleteLinkMutation = useMutation({
    mutationFn: deleteLink,
    onMutate: async (linkId) => {
      await queryClient.cancelQueries({ queryKey: ["links"] });
      const previousData = queryClient.getQueryData<{ data: LinkProps[] }>([
        "links",
      ]);
      queryClient.setQueryData(
        ["links"],
        (old: { data: LinkProps[] } | undefined) => {
          if (!old) return { data: [] };
          return {
            data: old.data.filter((link) => link.id !== linkId),
          };
        }
      );
      return { previousData };
    },
    onSuccess: () => {
      toast.success("Link excluído com sucesso!");
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error("Erro ao excluir o link.");
      setIsDialogOpen(false);
    },
  });

  const handleDeleteLink = async () => {
    if (linkId) {
      await deleteLinkMutation.mutateAsync(linkId);
    }
  };

  const onDeleteLink = (id: string) => {
    setLinkId(id);
    setIsDialogOpen(true);
  };

  return (
    <>
      {links && links.length > 0 ? (
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[400px]">
          {links.map((link) => (
            <ItemLink link={link} onDeleteLink={onDeleteLink} />
          ))}
        </div>
      ) : (
        <EmptyLinks />
      )}
      {isDialogOpen && (
        <ConfirmDeleteLinkDialog
          onConfirm={handleDeleteLink}
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
          }}
        />
      )}
    </>
  );
}
