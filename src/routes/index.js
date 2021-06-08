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

const Home = lazy(() => import("../application/Home"));
const Recommend = lazy(() => import("../application/Recommend"));

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
                path: "/recommend:id",
                component: SuspenseComponent(Recommend),
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
