export const isValidEmail = (
    email: string
) => {
    return /\S+@\S+\.\S+/.test(email);
};

export const isValidPassword = (
    password: string
) => {
    return password.length >= 6;
};

export const isValidName = (
    name: string
) => {
    return name.trim().length >= 6;
};