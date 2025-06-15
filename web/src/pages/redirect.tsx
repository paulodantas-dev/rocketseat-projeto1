import { useEffect } from "react";
import { Link, useLocation } from "react-router";

export function RedirectPage() {
  const location = useLocation();

  const shortenedPath = location.pathname.replace("/redirect/", "");

  const decodedPath = decodeURIComponent(shortenedPath);

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `https://${decodedPath}`;
    }, 3000);

    return () => clearTimeout(timer);
  }, [decodedPath]);

  return (
    <div className="h-screen flex flex-col items-center justify-center w-full bg-[#E4E6EC] p-3 lg:p-0">
      <div className="flex flex-col items-center gap-7 w-full max-w-xl bg-[#F9F9FB] rounded-xl py-16 px-12">
        <img src="/icon.svg" alt="404 - Page Not Found" />

        <h2 className="text-[#1F2025] text-xl font-bold">Redirecionando... </h2>
        <p className="text-[#4D505C] text-center font-semibold text-sm">
          O link será aberto automaticamente em alguns instantes. Não foi
          redirecionado?
          <Link
            to={`https://${decodedPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2C46B1] underline cursor-pointer"
          >
            Acesse aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
