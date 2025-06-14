import { Button } from "../ui/button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { InputLabel } from "../input-label";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "@/services/create-link";
import { toast } from "sonner";

const inputSchema = z.object({
  longLink: z
    .string()
    .url("O link original deve ser uma URL válida.")
    .nonempty("O link original é obrigatório."),
  shortLink: z.string().min(9, "O link encurtado é obrigatório."),
});

export type Inputs = z.infer<typeof inputSchema>;

export function Form() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      longLink: "",
      shortLink: "brev.ly/",
    },
  });

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: createLink,
    onMutate: async (newLink) => {
      await queryClient.cancelQueries({ queryKey: ["links"] });
      const previousData = queryClient.getQueryData<{ data: Inputs[] }>([
        "links",
      ]);
      queryClient.setQueryData(
        ["links"],
        (old: { data: Inputs[] } | undefined) => {
          if (!old) return { data: [] };
          return {
            data: [...old.data, newLink],
          };
        }
      );
      return { previousData };
    },
    onSuccess: () => {
      toast.success("Link criado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao criar o link: ${error.message}`);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await createMutation.mutateAsync(data.longLink);
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
