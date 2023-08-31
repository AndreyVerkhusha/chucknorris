import Main from "../pages/Main/Main";
import CurrentJoke from "../pages/CurrentJoke/CurrentJoke";

export const routes = [
  {path: "/", Component: Main},
  {path: "/:id", Component: CurrentJoke}
];