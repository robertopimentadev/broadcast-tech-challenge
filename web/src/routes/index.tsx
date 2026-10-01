import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { Connections } from "../pages/Connections";
import { ProtectedRoute } from "./ProtectedRoute";
import { Contacts } from "../pages/Contacts";
import { Broadcast } from "../pages/Broadcast";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route
          path="/connections"
          element={
            <ProtectedRoute>
              <Connections />
            </ProtectedRoute>
          }
        />
        <Route
          path="/connections/:connectionId/contacts"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/broadcast"
          element={
            <ProtectedRoute>
              <Broadcast />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
