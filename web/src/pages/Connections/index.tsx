import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

import {
  createConnection,
  deleteConnection,
  subscribeConnections,
} from "../../services/connections";

export function Connections() {
  const { user, logout } = useAuth();

  const [name, setName] = useState("");

  const [connections, setConnections] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeConnections(user.uid, setConnections);

    return unsubscribe;
  }, [user]);

  const handleCreate = async () => {
    if (!user || !name.trim()) return;

    await createConnection(user.uid, name);

    setName("");
  };

  const handleDelete = async (id: string) => {
    await deleteConnection(id);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Connections</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Sair
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome da conexão"
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Criar
        </button>
      </div>

      <div className="space-y-3">
        {connections.map((connection) => (
          <div
            key={connection.id}
            className="border p-3 rounded flex justify-between"
          >
            <span>{connection.name}</span>

            <button
              onClick={() => handleDelete(connection.id)}
              className="text-red-500"
            >
              Excluir
            </button>
            <Link
              to={`/connections/${connection.id}/contacts`}
              className="text-blue-600"
            >
              Contatos
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
