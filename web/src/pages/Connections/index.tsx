import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAuth } from "../../contexts/AuthContext";

import {
  createConnection,
  deleteConnection,
  subscribeConnections,
} from "../../services/connections";
import { Layout } from "../../components/Layout";
import type { Connection } from "../../types/connection";

export function Connections() {
  const { user } = useAuth();

  const [name, setName] = useState("");

  const [connections, setConnections] = useState<Connection[]>([]);

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
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Connections</h1>

        <p className="text-gray-500">Gerencie suas conexões.</p>
      </div>

      <div className="flex gap-3 mb-8">
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Nome da conexão"
          fullWidth
        />

        <Button variant="contained" onClick={handleCreate}>
          Criar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {connections.map((connection) => (
          <Card
            key={connection.id}
            sx={{
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {connection.name}
              </Typography>

              <div className="flex justify-between items-center mt-6">
                <Link
                  to={`/connections/${connection.id}/contacts`}
                  className="flex items-center gap-2 text-blue-600"
                >
                  <PeopleIcon fontSize="small" />
                  Contatos
                </Link>

                <Button
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(connection.id)}
                >
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
}
