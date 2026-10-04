import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Register } from "../pages/Register";
import { Connections } from "../pages/Connections";
import { ProtectedRoute } from "./ProtectedRoute";
import { Contacts } from "../pages/Contacts";
import { Broadcast } from "../pages/Broadcast";
import { Home } from "../pages/Home";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
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
