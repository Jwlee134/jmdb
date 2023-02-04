import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PersonDetail from "./router/PersonDetail";
import MovieDetail from "./router/MovieDetail";
import Search from "./router/Search";
import "./styles/index.css";
import Discover from "./router/Discover";
import Navigator from "./router/Navigator";
import Movies from "./router/Movies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Navigator />,
        children: [
          {
            index: true,
            element: <Movies />,
          },
          {
            path: "movie/:id",
            element: <MovieDetail />,
          },
          {
            path: "person/:id",
            element: <PersonDetail />,
          },
          {
            path: "search",
            element: <Search />,
          },
        ],
      },
      {
        path: "discover",
        element: <Discover />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
