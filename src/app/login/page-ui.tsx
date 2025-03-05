import { Button } from "@/components/Button"
import { FormField } from "@/components/FormField"
import { ILoginProps } from "@/types/user.type";
import { FieldErrors, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from "react-hook-form";

interface LoginPageUIProps {
  handleSubmit: UseFormHandleSubmit<ILoginProps>
  onSubmit: SubmitHandler<ILoginProps>
  register: UseFormRegister<ILoginProps>
  errors: FieldErrors<ILoginProps>
  isLoading: boolean
}

export const LoginPageUI = ({ 
  errors, handleSubmit, onSubmit, register, isLoading
}: LoginPageUIProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex gap-6 flex-col w-full">
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

      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input 
            {...register("remember")}
            id="remember" 
            type="checkbox" 
            className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 
              focus:ring-3 focus:ring-purple-300 
              checked:bg-purple-600 checked:border-purple-600 
              dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 
              dark:checked:bg-purple-600 dark:checked:border-purple-600"
          />
        </div>
        <label 
          htmlFor="remember" 
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Lembrar de mim
        </label>
      </div>

      <Button label="Log In" type="submit" loading={isLoading} />
    </form>
  )
}