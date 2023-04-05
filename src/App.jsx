import Login from "./pages/Start/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Start/Register/Register";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path="./"></Route>
                <Route element={<Register />} path="./register"></Route>
            </Routes>
        </BrowserRouter>
    );
}
