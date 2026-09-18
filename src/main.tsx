import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import UserProfile from "./UserProfile.tsx";
import { UserList } from "./UserList.tsx";
import AddNew from "./addNew.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>error happened</div>,
  },
  {
    path: "/userList",
    element: <UserList />,
    children: [
      {
        path: ":variableIPutInURL",
        element: <UserProfile />,
      },
      {
        path: "addNew",
        element: <AddNew />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
