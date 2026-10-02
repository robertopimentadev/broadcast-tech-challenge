import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

export function Home() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/connections" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-5xl font-bold mb-4">Broadcast</h1>

      <p className="text-gray-600 mb-8">
        Gerencie conexões, contatos e mensagens agendadas.
      </p>

      <div className="flex gap-4">
        <Link to="/login" className="bg-blue-600 text-white px-6 py-3 rounded">
          Entrar
        </Link>

        <Link to="/register" className="border px-6 py-3 rounded">
          Criar Conta
        </Link>
      </div>
    </div>
  );
}
