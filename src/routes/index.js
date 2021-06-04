import { lazy } from "react";
import BlankLayout from "../layouts/BlankLayout";
import HomeLayout from "../layouts/HomeLayout";

const Home = lazy(() => import("../application/Home"));

const routes = [
  {
    component: BlankLayout,
    routes: [
      {
        path: "/",
        component: HomeLayout,
        routes: [
          {
            path: "/home1",
            component: Home,
          },
        ],
      },
    ],
  },
];

export default routes;
