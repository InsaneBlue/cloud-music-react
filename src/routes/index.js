import { lazy, Suspense } from "react";
import { Redirect } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import BlankLayout from "../layouts/BlankLayout";

const SuspenseComponent = (Component) => (props) => {
  return (
    <Suspense fallback={null}>
      <Component {...props} />
    </Suspense>
  );
};

const Recommend = lazy(() => import("../application/Recommend"));
const Singers = lazy(() => import("../application/Singers"));
const Singer = lazy(() => import("../application/Singer"));
const Rank = lazy(() => import("../application/Rank"));
const Album = lazy(() => import("../application/Album"));
const Search = lazy(() => import("./../application/Search/"));

const routes = [
  {
    component: BlankLayout,
    routes: [
      {
        path: "/",
        component: HomeLayout,
        routes: [
          {
            path: "/",
            exact: true,
            render: () => <Redirect to="/recommend" />,
          },
          {
            path: "/recommend",
            component: SuspenseComponent(Recommend),
            routes: [
              {
                path: "/recommend/:id",
                component: SuspenseComponent(Album),
              },
            ],
          },
          {
            path: "/singers",
            component: SuspenseComponent(Singers),
            routes: [
              {
                path: "/singers/:id",
                component: SuspenseComponent(Singer),
              },
            ],
          },
          {
            path: "/rank",
            component: SuspenseComponent(Rank),
            routes: [
              {
                path: "/rank/:id",
                component: SuspenseComponent(Album),
              },
            ],
          },
          {
            path: "/search",
            exact: true,
            key: "search",
            component: SuspenseComponent(Search),
          },
        ],
      },
    ],
  },
];

export default routes;
