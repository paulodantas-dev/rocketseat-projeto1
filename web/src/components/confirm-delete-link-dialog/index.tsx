import { Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export function ConfirmDeleteLinkDialog({
  isOpen,
  loading = false,
  onClose,
  onConfirm,
}: {
  isOpen: boolean;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogDescription>
            Tem certeza de que deseja excluir este link? Esta ação não pode ser
            desfeita.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button
            disabled={loading}
            variant="secondary"
            onClick={onClose}
            className="cursor-pointer w-32"
          >
            Cancelar
          </Button>
          <Button
            disabled={loading}
            variant="destructive"
            onClick={onConfirm}
            className="cursor-pointer w-32"
          >
            {loading && <Loader2 className="animate-spin" />}
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
