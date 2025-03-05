import { Button } from "@/components/Button"
import { FormField } from "@/components/FormField"
import { CreateUserData } from "@/services/user";
import { ILoginProps } from "@/types/user.type";
import { FieldErrors, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface SignupPageUIProps {
  handleSubmit: UseFormHandleSubmit<CreateUserData>
  onSubmit: SubmitHandler<CreateUserData>
  register: UseFormRegister<CreateUserData>
  errors: FieldErrors<CreateUserData>
  isLoading: boolean
}

export const SignupPageUI = ({ 
  errors, handleSubmit, onSubmit, register, isLoading
}: SignupPageUIProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 flex-col w-full">
      <FormField 
        {...register("name", { required: "O nome é obrigatório" })}
        label="Nome"
        placeholder="Enter your name"
        type="text"
        error={errors.name?.message}
      />

      <div className="w-full flex items-center gap-4">
        <FormField 
          {...register("username", { required: "O nome de usuário é obrigatório" })}
          label="Nome do usuário"
          placeholder="Enter your username"
          type="text"
          error={errors.username?.message}
        />
        <FormField 
          {...register("birthDate", { required: "Campo obrigatório" })}
          label="Date de nascimento"
          type="date"
          error={errors.birthDate?.message}
        />
      </div>

      <FormField 
        {...register("email", { required: "E-mail é obrigatório" })}
        label="E-mail"
        placeholder="Enter your e-mail"
        name="email"
        type="email"
        error={errors.email?.message}
      />

      <FormField 
        {...register("password", { required: "Senha é obrigatória" })}
        label="Password"
        placeholder="Enter your password"
        name="password"
        type="password"
        error={errors.password?.message}
      />

      <Button label="Sign Up" type="submit" loading={isLoading} />
    </form>
  )
}