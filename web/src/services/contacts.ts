import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const createContact = async (
    userId: string,
    connectionId: string,
    name: string,
    phone: string
) => {
    await addDoc(
        collection(db, "contacts"),
        {
            userId,
            connectionId,
            name,
            phone,
            createdAt: serverTimestamp(),
        }
    );
};

export const deleteContact = async (
    id: string
) => {
    await deleteDoc(
        doc(db, "contacts", id)
    );
};

export const subscribeContacts = (
    userId: string,
    connectionId: string,
    callback: (data: any[]) => void
) => {
    const q = query(
        collection(db, "contacts"),
        where("userId", "==", userId),
        where("connectionId", "==", connectionId)
    );

    return onSnapshot(q, (snapshot) => {
        callback(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
        );
    });
};