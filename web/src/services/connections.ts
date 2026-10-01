import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    serverTimestamp,
    updateDoc,
    where,
    onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const createConnection = async (
    userId: string,
    name: string
) => {
    await addDoc(
        collection(db, "connections"),
        {
            userId,
            name,
            createdAt: serverTimestamp(),
        }
    );
};

export const getConnections = async (
    userId: string
) => {
    const q = query(
        collection(db, "connections"),
        where("userId", "==", userId)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
};

export const updateConnection = async (
    id: string,
    name: string
) => {
    await updateDoc(
        doc(db, "connections", id),
        {
            name,
        }
    );
};

export const deleteConnection = async (
    id: string
) => {
    await deleteDoc(
        doc(db, "connections", id)
    );
};

export const subscribeConnections = (
    userId: string,
    callback: (connections: any[]) => void
) => {
    const q = query(
        collection(db, "connections"),
        where("userId", "==", userId)
    );

    return onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        callback(data);
    });
};