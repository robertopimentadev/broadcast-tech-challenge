export interface Message {
    id: string;
    userId: string;
    connectionId: string;
    contactIds: string[];
    content: string;
    status: "scheduled" | "sent";
}