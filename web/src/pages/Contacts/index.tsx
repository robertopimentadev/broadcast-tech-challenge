import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  createContact,
  deleteContact,
  subscribeContacts,
} from "../../services/contacts";

import { useAuth } from "../../contexts/AuthContext";

export function Contacts() {
  const { user } = useAuth();

  const { connectionId } = useParams();

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [contacts, setContacts] = useState<any[]>([]);

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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Contacts</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome"
          className="border p-2"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Telefone"
          className="border p-2"
        />

        <button onClick={handleCreate} className="bg-blue-600 text-white px-4">
          Criar
        </button>
      </div>

      {contacts.map((contact) => (
        <div key={contact.id} className="border p-3 mb-2 flex justify-between">
          <div>
            <strong>{contact.name}</strong>

            <div>{contact.phone}</div>
          </div>

          <button
            onClick={() => deleteContact(contact.id)}
            className="text-red-500"
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}
