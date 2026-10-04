import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  MenuItem,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";

import {
  createMessage,
  subscribeMessages,
  updateMessage,
} from "../../services/messages";
import { subscribeConnections } from "../../services/connections";
import { subscribeContacts } from "../../services/contacts";
import { deleteMessage } from "../../services/messages";

import { useAuth } from "../../contexts/AuthContext";
import { Layout } from "../../components/Layout";
import type { Connection } from "../../types/connection";
import type { Contact } from "../../types/contact";
import type { Message } from "../../types/message";

export function Broadcast() {
  const { user } = useAuth();

  const [connections, setConnections] = useState<Connection[]>([]);

  const [connectionId, setConnectionId] = useState("");

  const [content, setContent] = useState("");

  const [scheduledAt, setScheduledAt] = useState("");

  const [contacts, setContacts] = useState<Contact[]>([]);

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const [messages, setMessages] = useState<Message[]>([]);

  const [filter, setFilter] = useState("all");

  const [editingId, setEditingId] = useState("");

  const [editingContent, setEditingContent] = useState("");

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeConnections(user.uid, setConnections);

    return unsubscribe;
  }, [user]);

  useEffect(() => {
    if (!user || !connectionId) return;

    const unsubscribe = subscribeContacts(user.uid, connectionId, setContacts);

    return unsubscribe;
  }, [user, connectionId]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = subscribeMessages(user.uid, setMessages);

    return unsubscribe;
  }, [user]);

  const handleCreate = async () => {
    if (!user) return;

    await createMessage({
      userId: user.uid,
      connectionId,
      contactIds: selectedContacts,
      content,
      scheduledAt: new Date(scheduledAt),
    });

    setContent("");
    setScheduledAt("");
    setSelectedContacts([]);
  };

  const toggleContact = (contactId: string) => {
    setSelectedContacts((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId],
    );
  };

  const filteredMessages =
    filter === "all"
      ? messages
      : messages.filter((message) => message.status === filter);

  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Nova Mensagem
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 4 }}>
              Crie um novo broadcast para seus contatos.
            </Typography>
            <TextField
              select
              label="Conexão"
              value={connectionId}
              onChange={(e) => setConnectionId(e.target.value)}
              fullWidth
            >
              {connections.map((connection) => (
                <MenuItem key={connection.id} value={connection.id}>
                  {connection.name}
                </MenuItem>
              ))}
            </TextField>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
              {contacts.map((contact) => (
                <label
                  key={contact.id}
                  className="border rounded-lg p-3 flex items-center gap-2 hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => toggleContact(contact.id)}
                  />

                  <div>
                    <div className="font-medium">{contact.name}</div>

                    <div className="text-sm text-gray-500">{contact.phone}</div>
                  </div>
                </label>
              ))}
            </div>

            <TextField
              label="Mensagem"
              multiline
              minRows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              sx={{ mt: 3 }}
            />

            <div className="flex items-center gap-4 mt-3">
              <TextField
                label="Agendar para"
                type="datetime-local"
                value={scheduledAt}
                onChange={(e) => setScheduledAt(e.target.value)}
                sx={{ width: 280 }}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />

              <Button variant="contained" size="large" onClick={handleCreate}>
                Agendar Mensagem
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: 3,
              }}
            >
              Mensagens
            </Typography>

            <div className="flex gap-2 mb-6">
              <Chip
                label="Todas"
                color={filter === "all" ? "primary" : "default"}
                onClick={() => setFilter("all")}
              />

              <Chip
                label="Agendadas"
                color={filter === "scheduled" ? "warning" : "default"}
                onClick={() => setFilter("scheduled")}
              />

              <Chip
                label="Enviadas"
                color={filter === "sent" ? "success" : "default"}
                onClick={() => setFilter("sent")}
              />
            </div>

            <div className="grid gap-4">
              {filteredMessages.map((message) => (
                <Card key={message.id}>
                  <CardContent>
                    {editingId === message.id ? (
                      <TextField
                        fullWidth
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                      />
                    ) : (
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        {message.content}
                      </Typography>
                    )}
                    <Chip
                      className="mt-2"
                      label={message.status === "sent" ? "Enviada" : "Agendada"}
                      color={message.status === "sent" ? "success" : "warning"}
                    />
                    <p className="mt-2">
                      👥 {message.contactIds.length} contato(s)
                    </p>
                    <p className="mt-2 text-gray-500">
                      📅{" "}
                      {message.scheduledAt?.toDate()?.toLocaleString("pt-BR")}
                    </p>
                    <div className="flex gap-2 mt-5">
                      {editingId === message.id ? (
                        <Button
                          size="small"
                          color="success"
                          variant="contained"
                          startIcon={<SaveIcon />}
                          onClick={async () => {
                            await updateMessage(message.id, editingContent);

                            setEditingId("");
                            setEditingContent("");
                          }}
                        >
                          Salvar
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          variant="outlined"
                          startIcon={<EditIcon />}
                          onClick={() => {
                            setEditingId(message.id);
                            setEditingContent(message.content);
                          }}
                        >
                          Editar
                        </Button>
                      )}

                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => deleteMessage(message.id)}
                      >
                        Excluir
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
