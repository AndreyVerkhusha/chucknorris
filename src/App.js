import { Route, Routes } from "react-router-dom";
import { routes } from "./route/routes";

function App() {

  return (
    <div className="app">
      <Routes>
        {routes.map((Page) =>
            <Route
              path={Page.path}
              element={<Page.Component/>}
              key={Page.path}
            />
        )}
      </Routes>
    </div>
  );
}

export default App;
