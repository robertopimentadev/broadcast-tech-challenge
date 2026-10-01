import { useEffect, useState } from "react";

import { createMessage } from "../../services/messages";
import { subscribeConnections } from "../../services/connections";
import { subscribeContacts } from "../../services/contacts";

import { useAuth } from "../../contexts/AuthContext";

export function Broadcast() {
  const { user } = useAuth();

  const [connections, setConnections] = useState<any[]>([]);

  const [connectionId, setConnectionId] = useState("");

  const [content, setContent] = useState("");

  const [scheduledAt, setScheduledAt] = useState("");

  const [contacts, setContacts] = useState<any[]>([]);

  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

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
    </div>
  );
}
