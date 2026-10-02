import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import PhoneIcon from "@mui/icons-material/Phone";

import {
  createContact,
  deleteContact,
  subscribeContacts,
} from "../../services/contacts";

import { useAuth } from "../../contexts/AuthContext";
import type { Contact } from "../../types/contact";
import { Layout } from "../../components/Layout";

export function Contacts() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { connectionId } = useParams();

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [contacts, setContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (!user || !connectionId) return;

    const unsubscribe = subscribeContacts(user.uid, connectionId, setContacts);

    return unsubscribe;
  }, [user, connectionId]);

  const handleCreate = async () => {
    if (!user || !connectionId) return;

    await createContact(user.uid, connectionId, name, phone);

    setName("");
    setPhone("");
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Contacts</h1>

        <p className="text-gray-500">Gerencie os contatos da conexão.</p>
      </div>

      <div className="flex gap-3 mb-8">
        <TextField
          label="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />

        <TextField
          label="Telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          fullWidth
        />

        <Button variant="contained" onClick={handleCreate}>
          Criar
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <Card
            key={contact.id}
            sx={{
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                }}
              >
                {contact.name}
              </Typography>

              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <PhoneIcon fontSize="small" />

                <span>{contact.phone}</span>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteContact(contact.id)}
                >
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        variant="outlined"
        onClick={() => navigate("/connections")}
        sx={{ mb: 3, mt: 5 }}
      >
        Voltar
      </Button>
    </Layout>
  );
}
