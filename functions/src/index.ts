import * as admin from "firebase-admin";

// eslint-disable-next-line object-curly-spacing
import { onSchedule } from "firebase-functions/v2/scheduler";

admin.initializeApp();

const db = admin.firestore();

export const processScheduledMessages = onSchedule(
  "every 1 minutes",
  async () => {
    const now = admin.firestore.Timestamp.now();

    const snapshot = await db
      .collection("messages")
      .where("status", "==", "scheduled")
      .where("scheduledAt", "<=", now)
      .get();

    const updates = snapshot.docs.map((doc) =>
      doc.ref.update({
        status: "sent",
        sentAt: now,
      }),
    );

    await Promise.all(updates);

    console.log(
      `${snapshot.size} mensagem(ns) processada(s)`,
    );
  },
);
