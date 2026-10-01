import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Register } from "../pages/Register";
import { Login } from "../pages/Login";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
