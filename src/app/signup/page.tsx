'use client'
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { errorNotify, successNotify } from "@/utils/notify";
import { useState } from "react";
import Link from "next/link";
import { SignupPageUI } from "./page-ui";
import { createUserService } from "@/services/user";

interface CreateUserFormData {
  name: string
  username: string
  email: string;
  password: string;
  birthDate: Date
}

export default function SignupPage() {
  const router = useRouter()
  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>();
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: CreateUserFormData) => {
    setLoading(true)
    const response = await createUserService(data)

    if (response.statusCode != 201) {
      setLoading(false)
      errorNotify(response.message)
      return
    }
    
    setLoading(false)
    successNotify('Usuário cadastro com sucesso')
    router.push("/login")
  }

  return (
    <main className="w-full p-8 flex items-center justify-center">
      <div className="w-full p-8 rounded-xl shadow-2xl flex flex-col items-center">
        <h1 className="text-purple-900 font-bold text-4xl mb-10">Sign Up - LinkUp</h1>

        <SignupPageUI 
          handleSubmit={handleSubmit}
          register={register}
          onSubmit={onSubmit}
          errors={errors}
          isLoading={loading}
        />

        <div className="w-full flex justify-between items-center mt-6">
          <span className="font-semibold text-gray-700">Já possui uma conta?</span>
          <Link href="/login"
            className="cursor-pointer font-bold flex justify-center
            text-md text-purple-800 hover:text-purple-600 hover:underline transition duration-200"
          >
            Entrar
          </Link>
        </div>
      </div>
    </main>
  )
}