import {
    addDoc,
    collection,
    onSnapshot,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";

import { db } from "../firebase/config";

export const createMessage = async ({
    userId,
    connectionId,
    contactIds,
    content,
    scheduledAt,
}: {
    userId: string;
    connectionId: string;
    contactIds: string[];
    content: string;
    scheduledAt: Date;
}) => {
    await addDoc(
        collection(db, "messages"),
        {
            userId,
            connectionId,
            contactIds,
            content,

            status: "scheduled",

            scheduledAt,

            sentAt: null,

            createdAt: serverTimestamp(),
        }
    );
};

export const subscribeMessages = (
    userId: string,
    callback: (messages: any[]) => void
) => {
    const q = query(
        collection(db, "messages"),
        where("userId", "==", userId)
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