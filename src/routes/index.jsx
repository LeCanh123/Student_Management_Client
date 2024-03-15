// Xây dựng các router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lazy from "../utils/Lazy/Lazy";
import Home from "../pages/Home/Home";

const RouteSetUp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="login"
          element={Lazy(() => import("../pages/Login/Login"))()}
        ></Route>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="register"
          element={Lazy(() => import("../pages/Register/Register"))()}
        ></Route>
      </Routes>

      <Routes>
        <Route
          path="admin"
          element={Lazy(() => import("../pages/Admin/Admin"))()}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSetUp;
