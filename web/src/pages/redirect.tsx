export function RedirectPage() {
  return (
    <div className="h-screen flex flex-col items-center justify-center w-full bg-[#E4E6EC] p-3 lg:p-0">
      <div className="flex flex-col items-center gap-7 w-full max-w-xl bg-[#F9F9FB] rounded-xl py-16 px-12">
        <img src="/icon.svg" alt="404 - Page Not Found" />

        <h2 className="text-[#1F2025] text-xl font-bold">Redirecionando... </h2>
        <p className="text-[#4D505C] text-center font-semibold text-sm">
          O link será aberto automaticamente em alguns instantes. Não foi
          redirecionado?
          <span className="text-[#2C46B1] underline cursor-pointer">
            Acesse aqui
          </span>
        </p>
      </div>
    </div>
  );
}
