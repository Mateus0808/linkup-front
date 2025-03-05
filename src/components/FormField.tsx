import { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string
}

export const FormField = ({ label, name, error, type, ...rest }: FormFieldProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label htmlFor={name} className="font-bold text-gray-700">{label}</label>
      <input name={name} type={type} {...rest} 
        className="border border-gray-600 p-4 rounded-xl placeholder:font-bold" 
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}