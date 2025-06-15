import { NotFoundPage } from "@/pages/404";
import { HomePage } from "@/pages/home";
import { RedirectPage } from "@/pages/redirect";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/redirect/:linkId",
    element: <RedirectPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
