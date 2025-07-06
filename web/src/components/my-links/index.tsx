import type { LinkProps } from '@/types/link';
import { toast } from 'sonner';
import { useState } from 'react';
import { ConfirmDeleteLinkDialog } from '../confirm-delete-link-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { EmptyLinks } from '../empty-links';
import { ItemLink } from '../item-link';
import { deleteLink } from '@/services/delete-link';

export function MyLinks({ links }: { links: LinkProps[] | undefined }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [linkId, setLinkId] = useState<string | null>(null);

  const queryClient = useQueryClient();

  const deleteLinkMutation = useMutation({
    mutationFn: deleteLink,
    onSuccess: () => {
      toast.success('Link excluído com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['links'] });
      setIsDialogOpen(false);
    },
    onError: () => {
      toast.error('Erro ao excluir o link.');
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
        <div className="flex flex-col gap-4 overflow-y-auto max-h-[200px]">
          {links.map((link) => (
            <ItemLink key={link.id} link={link} onDeleteLink={onDeleteLink} />
          ))}
        </div>
      ) : (
        <EmptyLinks />
      )}
      {isDialogOpen && (
        <ConfirmDeleteLinkDialog
          onConfirm={handleDeleteLink}
          loading={deleteLinkMutation.isPending}
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
          }}
        />
      )}
    </>
  );
}
