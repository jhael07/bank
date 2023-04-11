import Login from "./pages/Start/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Start/Register";
import HomeCustomer from "./pages/Home/HomeCustomer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Login />} path="/"></Route>
        <Route element={<Register />} path="/register"></Route>
        <Route element={<HomeCustomer />} path="/Home/customer"></Route>
      </Routes>
    </BrowserRouter>
  );
}
