import { Outlet, type RouteObject } from "react-router-dom";
import { Suspense } from "react";
import { PageNotFound } from "./components/PageNotFound";
import { Home } from "./home/Home";
import { RedirectComponent } from "./components/RedirectComponent";
import { AddUser } from "./users/AddUser";
import { EditUser } from "./users/EditUser";

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
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/edit-user/:userId",
        element: <EditUser />,
      },
    ],
  },
  {
    path: "*",
    element: <RedirectComponent />,
  },
];
