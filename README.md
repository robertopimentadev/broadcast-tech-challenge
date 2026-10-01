users

connections

contacts

messages

USERS

{

id: "uid_firebase",

name: "Roberto",

email: "roberto@email.com",

createdAt: Timestamp

}

CONNECTIONS

{

id: "conn_1",

userId: "uid_firebase",

name: "WhatsApp Comercial",

createdAt: Timestamp

}

CONTACTS

{

id: "contact_1",

userId: "uid_firebase",

connectionId: "conn_1",

name: "João",

phone: "5598988888888",

createdAt: Timestamp

}

MESSAGES

{

id: "msg_1",

userId: "uid_firebase",

connectionId: "conn_1",

contactIds: [

    "contact_1",

    "contact_2"

],

content: "Promoção da semana",

status: "scheduled",

scheduledAt: Timestamp,

sentAt: null,

createdAt: Timestamp

}

STATUS

type MessageStatus =

| "scheduled"

| "sent";

## Cloud Functions

A Cloud Function `processScheduledMessages`
foi implementada e compilada com sucesso.

O deploy não foi realizado porque
o Firebase exige o plano Blaze para habilitar:

- Cloud Functions v2
- Cloud Build
- Artifact Registry

Para executar:

firebase deploy --only functions
