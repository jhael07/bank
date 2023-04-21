import Login from "./pages/Start/Login";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Start/Register";
import HomeCustomer from "./pages/Home/HomeCustomer";
import PagesContextProvider from "./context/PagesContextProvider";
import Prestamos from "./pages/Prestamos/Prestamos";
import Inversiones from "./pages/Inversiones/Inversiones";
import Historial from "./pages/Historial/Historial";

export default function App() {
  return (
    <PagesContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<HomeCustomer />} path="/home" />
          <Route element={<Prestamos />} path="/prestamos" />
          <Route element={<Inversiones />} path="/inversiones" />
          <Route element={<Historial />} path="/historial" />
          <Route
            path="*"
            element={
              <div>
                <h1 className="text-white text-8xl mt-24">404 PAGE NOT FOUND</h1>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </PagesContextProvider>
  );
}
