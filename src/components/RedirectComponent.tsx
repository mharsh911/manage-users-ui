import type { FC } from "react";
import { Navigate } from "react-router-dom";

export const RedirectComponent: FC<{}> = () => {
  return <Navigate to="/home" replace />;
};
