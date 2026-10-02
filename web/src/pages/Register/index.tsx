import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/auth";
import { useState } from "react";
import { Alert, Card, CardContent, TextField, Typography } from "@mui/material";
import { LoadingButton } from "../../components/LoadingButton";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../../utils/validations";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, watch } = useForm<FormData>();

  const name = watch("name");
  const email = watch("email");
  const password = watch("password");

  const hasTypedName = name !== undefined && name !== "";

  const hasTypedEmail = email !== undefined && email !== "";

  const hasTypedPassword = password !== undefined && password !== "";

  const validName = isValidName(name || "");

  const validEmail = isValidEmail(email || "");

  const validPassword = isValidPassword(password || "");

  const isValidForm = validName && validEmail && validPassword;

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setErrorMessage("");

      await registerUser(data);

      navigate("/connections");
    } catch {
      setErrorMessage("Não foi possível criar a conta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <Card
        sx={{
          width: "100%",
          maxWidth: 500,
          borderRadius: 4,
        }}
      >
        <CardContent className="p-8">
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              mb: 1,
              textAlign: "center",
            }}
          >
            Broadcast
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              label="Nome"
              fullWidth
              error={hasTypedName && !validName}
              helperText={
                hasTypedName && !validName ? "No mínimo 6 caracteres" : " "
              }
              {...register("name")}
            />
            <TextField
              label="E-mail"
              fullWidth
              error={hasTypedEmail && !validEmail}
              helperText={
                hasTypedEmail && !validEmail ? "E-mail inválido" : " "
              }
              {...register("email")}
            />
            <TextField
              label="Senha"
              type="password"
              fullWidth
              error={hasTypedPassword && !validPassword}
              helperText={
                hasTypedPassword && !validPassword
                  ? "No mínimo 6 caracteres"
                  : " "
              }
              {...register("password")}
            />

            <LoadingButton
              type="submit"
              loading={loading}
              disabled={!isValidForm}
              text="Criar conta"
              loadingText="Criando conta..."
            />

            <div className="mt-2 min-h-14">
              {errorMessage ? (
                <Alert severity="error">{errorMessage}</Alert>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
