import { Form } from "@/components/form";
import { MyLinks } from "@/components/my-links";
import { SkeletonLink } from "@/components/skeleton-link";
import { Button } from "@/components/ui/button";
import { exportLinks } from "@/services/export-links";
import { getLinks } from "@/services/get-links";
import { useQuery } from "@tanstack/react-query";
import { Download, Loader2 } from "lucide-react";
import { useState } from "react";

export function HomePage() {
  const [loadingCsv, setLoadingCsv] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: getLinks,
  });

  const handleDownloadCsv = async () => {
    setLoadingCsv(true);
    await exportLinks();
    setLoadingCsv(false);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center w-full bg-[#E4E6EC] ">
      <div className="flex flex-col w-full max-w-4xl gap-8 overflow-scroll md:overflow-auto py-4">
        <div className="flex items-center justify-center lg:justify-start">
          <img src="/logo.svg" alt="Logo" />
        </div>
        <main className="flex flex-col items-center px-4 gap-5 lg:flex-row lg:items-start">
          <section className="p-8 rounded-xl w-full max-w-96 bg-[#F9F9FB] flex flex-col gap-6">
            <h2 className="text-[#1F2025] text-lg font-bold">Novo Link</h2>

            <Form />
          </section>
          <section className="p-8 rounded-xl w-full max-w-96 lg:max-w-xl bg-[#F9F9FB] flex flex-col gap-5 ">
            <div className="flex items-center justify-between">
              <h2 className="text-[#1F2025] text-lg font-bold">Meus links</h2>
              <Button
                className="cursor-pointer"
                variant={"secondary"}
                onClick={handleDownloadCsv}
                disabled={isLoading || loadingCsv}
              >
                {loadingCsv ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Download />
                )}
                Baixar CSV
              </Button>
            </div>
            {isLoading ? (
              <div className="flex flex-col">
                {Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonLink key={index} />
                ))}
              </div>
            ) : (
              <MyLinks links={data?.data} />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
