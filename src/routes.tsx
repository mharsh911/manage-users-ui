import { Outlet, type RouteObject } from "react-router-dom";
import { Suspense } from "react";
import { PageNotFound } from "./components/PageNotFound";
import { Home } from "./home/Home";
import { RedirectComponent } from "./components/RedirectComponent";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Suspense>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <RedirectComponent />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "*",
    element: <RedirectComponent />,
  },
];
