'use client'
import { useForm } from "react-hook-form";
import { LoginPageUI } from "./page-ui";
import { userLogin } from "@/services/auth/login";
import { useRouter } from "next/navigation";
import { errorNotify } from "@/utils/notify";
import { useState } from "react";
import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

export default function LoginPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    const response = await userLogin(data)

    if (response.message) {
      errorNotify(response.message)
      setLoading(false)
      return
    }

    setLoading(false)
    router.push("/")
  }

  return (
    <main className="w-full p-8 flex items-center justify-center">
      <div className="w-full p-8 rounded-xl shadow-2xl flex flex-col items-center">
        <h1 className="text-purple-900 font-bold text-4xl mb-10">Log In - LinkUp</h1>
        <LoginPageUI 
          handleSubmit={handleSubmit}
          register={register}
          onSubmit={onSubmit}
          errors={errors}
          isLoading={loading}
        />
        <div className="w-full flex justify-between items-center mt-6">
          <span className="font-semibold text-gray-700">Esqueceu sua senha?</span>
          <Link href=""
            className="cursor-pointer font-bold flex justify-center
            text-md text-purple-800 hover:text-purple-600 hover:underline transition duration-200"
          >
            Alterar senha
          </Link>
        </div>
        <div className="w-full flex justify-center items-center mt-6">
          <Link href="/signup"
            className="cursor-pointer font-bold flex justify-center
            text-md text-purple-800 hover:text-purple-600 hover:underline transition duration-200"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </main>
  )
}