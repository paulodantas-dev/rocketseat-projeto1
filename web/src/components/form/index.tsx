import { Button } from '../ui/button';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { InputLabel } from '../input-label';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createLink } from '@/services/create-link';
import { toast } from 'sonner';

const inputSchema = z.object({
  longLink: z
    .string()
    .url('O link original deve ser uma URL válida.')
    .nonempty('O link original é obrigatório.'),
  shortLink: z.string().min(2, 'O link encurtado é obrigatório.'),
});

export type Inputs = z.infer<typeof inputSchema>;

export function Form() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      longLink: '',
      shortLink: 'brev.ly/',
    },
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createLink,
    onSuccess: () => {
      toast.success('Link criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['links'] });
      reset();
    },
    onError: (error) => {
      toast.error(`Erro ao criar o link: ${error.message}`);
      reset();
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const shortenedUrl = data.shortLink.startsWith('brev.ly/')
      ? data.shortLink
      : `brev.ly/${data.shortLink}`;

    await createMutation.mutateAsync({
      longUrl: data.longLink,
      shortenedUrl,
    });
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4">
        <InputLabel
          label="LINK ORIGINAL"
          name="longLink"
          control={control}
          placeholder="www.exemplo.com.br"
          erroMessage={errors.longLink?.message}
        />

        <InputLabel
          label="LINK ENCURTADO"
          name="shortLink"
          control={control}
          placeholder="brev.ly/"
          erroMessage={errors.shortLink?.message}
        />
      </div>

      <Button
        disabled={isSubmitting}
        className="h-12 bg-[#2C46B1] hover:bg-[#2C4091] cursor-pointer transition-colors"
        type="submit"
      >
        {isSubmitting && <Loader2 className="animate-spin transition-all" />}
        Salvar link
      </Button>
    </form>
  );
}
