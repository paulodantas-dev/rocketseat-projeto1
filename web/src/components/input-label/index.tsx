import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Controller, type Control } from "react-hook-form";
import type { Inputs } from "../form";
import { cn } from "@/lib/utils";

interface InputLabelProps {
  label: string;
  erroMessage?: string;
  name: keyof Inputs;
  control: Control<Inputs>;
  placeholder?: string;
}

export function InputLabel({
  label,
  erroMessage,
  name,
  control,
  placeholder,
}: InputLabelProps) {
  return (
    <div className="flex flex-col gap-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <Label className="text-[#4D505C] text-xs font-normal uppercase">
              {label}
            </Label>
            <Input
              className={cn(
                "",
                erroMessage &&
                  "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/50 text-red-500 placeholder:text-red-500"
              )}
              placeholder={placeholder}
              {...field}
            />
          </div>
        )}
      />

      {erroMessage && (
        <span className="text-red-500 text-xs">{erroMessage}</span>
      )}
    </div>
  );
}
