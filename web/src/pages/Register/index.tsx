import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerUser } from "../../services/auth";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser(data);

      navigate("/connections");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-96"
      >
        <input
          placeholder="Nome"
          {...register("name")}
          className="border p-3 rounded"
        />

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

        <button type="submit" className="bg-blue-600 text-white p-3 rounded">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
