import { useForm } from "react-hook-form";

import { loginUser } from "../../services/auth";

interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser(data.email, data.password);

      alert("Login realizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao realizar login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-96"
      >
        <input
          placeholder="Email"
          {...register("email")}
          className="border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Senha"
          {...register("password")}
          className="border p-3 rounded"
        />

        <button type="submit" className="bg-green-600 text-white p-3 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}
