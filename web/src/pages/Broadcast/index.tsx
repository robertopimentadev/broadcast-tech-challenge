import { useEffect, useState } from "react";

import {
  createMessage,
  subscribeMessages,
  updateMessage,
} from "../../services/messages";
import { subscribeConnections } from "../../services/connections";
import { subscribeContacts } from "../../services/contacts";
import { deleteMessage } from "../../services/messages";

import { useAuth } from "../../contexts/AuthContext";

export function Broadcast() {
  const { user } = useAuth();

  const [connections, setConnections] = useState<any[]>([]);

  const [connectionId, setConnectionId] = useState("");

  const [content, setContent] = useState("");

  const [scheduledAt, setScheduledAt] = useState("");

  const [contacts, setContacts] = useState<any[]>([]);

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const [messages, setMessages] = useState<any[]>([]);

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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Broadcast</h1>

      <div className="space-y-4 max-w-lg">
        <select
          value={connectionId}
          onChange={(e) => setConnectionId(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="">Selecione</option>

          {connections.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <div className="border rounded p-4">
          <h3 className="font-semibold mb-2">Contatos</h3>

          {contacts.map((contact) => (
            <label key={contact.id} className="flex gap-2 mb-2">
              <input
                type="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={() => toggleContact(contact.id)}
              />

              <span>
                {contact.name} - {contact.phone}
              </span>
            </label>
          ))}
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full"
          placeholder="Mensagem"
        />

        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
        />

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Agendar
        </button>
      </div>

      <div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2"
        >
          <option value="all">Todas</option>

          <option value="scheduled">Agendadas</option>

          <option value="sent">Enviadas</option>
        </select>

        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Mensagens</h2>

          {filteredMessages.map((message) => (
            <div key={message.id} className="border rounded p-4 mb-3">
              {editingId === message.id ? (
                <div className="flex gap-2">
                  <input
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                    className="border p-2 flex-1"
                  />

                  <button
                    onClick={async () => {
                      await updateMessage(message.id, editingContent);

                      setEditingId("");
                    }}
                    className="bg-green-600 text-white px-3"
                  >
                    Salvar
                  </button>
                </div>
              ) : (
                <p>{message.content}</p>
              )}

              <p>
                Status:
                <strong> {message.status}</strong>
              </p>
              <p>Agendada: {message.scheduledAt?.toDate()?.toLocaleString()}</p>
              <button
                onClick={() => deleteMessage(message.id)}
                className="text-red-500"
              >
                Excluir
              </button>
              <button
                onClick={() => {
                  setEditingId(message.id);
                  setEditingContent(message.content);
                }}
                className="text-blue-500"
              >
                Editar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
