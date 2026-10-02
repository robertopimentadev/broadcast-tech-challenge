import type { Timestamp } from "firebase/firestore";

export interface Message {
    id: string;
    userId: string;
    connectionId: string;
    contactIds: string[];
    content: string;
    status: "scheduled" | "sent";
    scheduledAt: Timestamp;
    sentAt: Timestamp | null;
}