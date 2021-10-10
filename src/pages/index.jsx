import LoginPage from "./login";
import AppPage from "./app";
import { Navigate, Outlet } from "react-router-dom";

export const routes = (account) => [
  {
    path: "/login",
    element: account ? <Navigate to="/app" /> : <LoginPage />,
  },
  {
    path: "/app",
    element: account ? <Outlet /> : <Navigate to="/login" />,
    children: [
      {
        element: <AppPage account={account} />,
        index: true,
      },
      {
        element: <AppPage account={account} />,
        path: ":userId",
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];
