import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    doc,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

interface RegisterParams {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async ({
    name,
    email,
    password,
}: RegisterParams) => {
    const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    const { user } = userCredential;

    await setDoc(doc(db, "users", user.uid), {
        id: user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
    });

    return user;
};

export const loginUser = async (
    email: string,
    password: string
) => {
    const userCredential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    return userCredential.user;
};