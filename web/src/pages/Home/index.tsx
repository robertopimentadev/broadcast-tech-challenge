import { Navigate, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { loginUser } from "../../services/auth";

import {
  Alert,
  CircularProgress,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
} from "@mui/material";

interface FormData {
  email: string;
  password: string;
}

export function Home() {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const { register, handleSubmit, watch } = useForm<FormData>();

  const email = watch("email");
  const password = watch("password");
  const hasTypedEmail = email !== undefined && email !== "";
  const hasTypedPassword = password !== undefined && password !== "";

  const isEmailValid = /\S+@\S+\.\S+/.test(email || "");

  const isPasswordValid = (password?.length || 0) >= 6;

  const isValidForm =
    /\S+@\S+\.\S+/.test(email || "") && (password?.length || 0) >= 6;

  const [successLogin, setSuccessLogin] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/connections" />;
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setErrorMessage("");

      await loginUser(data.email, data.password);

      setSuccessLogin(true);

      setTimeout(() => {
        navigate("/connections");
      }, 800);
    } catch {
      setErrorMessage("E-mail ou senha incorretos.");
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

          <Typography
            color="text.secondary"
            sx={{
              mb: 4,
              textAlign: "center",
            }}
          >
            Gerencie conexões, contatos e mensagens agendadas.
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              label="E-mail"
              fullWidth
              error={hasTypedEmail && !isEmailValid}
              helperText={
                hasTypedEmail && !isEmailValid ? "E-mail inválido" : " "
              }
              sx={{ mt: 2 }}
              {...register("email")}
            />

            <TextField
              label="Senha"
              type="password"
              fullWidth
              error={hasTypedPassword && !isPasswordValid}
              helperText={
                hasTypedPassword && !isPasswordValid
                  ? "No mínimo 6 caracteres"
                  : " "
              }
              sx={{ mt: 2 }}
              {...register("password")}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={!isValidForm || loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <CircularProgress size={18} color="inherit" />

                  {successLogin ? "Carregando seu ambiente..." : "Entrando..."}
                </div>
              ) : (
                "Entrar"
              )}
            </Button>

            <div className="mt-2 min-h-14">
              {errorMessage ? (
                <Alert severity="error">{errorMessage}</Alert>
              ) : null}
            </div>
          </form>

          <div className="mt-6 text-center">
            <Typography variant="body2" sx={{ mt: 1 }}>
              Não possui conta?
            </Typography>

            <Link to="/register" className="text-blue-600 font-medium">
              Criar conta
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
