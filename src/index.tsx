import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import PersonDetail from "./router/PersonDetail";
import MovieDetail from "./router/MovieDetail";
import Explore from "./router/Explore";
import "./styles/index.css";
import Discover from "./router/Discover";
import Navigator from "./router/Navigator";
import Movies from "./router/Movies";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Reviews from "./router/Reviews";
import Favorites from "./router/Favorites";
import ErrorPage from "./ErrorPage";
import Settings from "./router/Settings";

import "./i18n";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Navigator />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Movies />,
          },
          {
            path: "movie/:id",
            element: <MovieDetail />,
            errorElement: <ErrorPage />,
          },
          {
            path: "person/:id",
            element: <PersonDetail />,
            errorElement: <ErrorPage />,
          },
          {
            path: "explore",
            element: <Explore />,
          },
          {
            path: "favorites",
            element: <Favorites />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: "discover",
        element: <Discover />,
      },
      {
        path: "movie/:id/reviews",
        element: <Reviews />,
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
