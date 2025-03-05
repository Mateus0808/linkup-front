import { createCommentService } from "@/services/comment";
import { Send } from "lucide-react";
import Image from "next/image"
import { FormSubmitHandler, SubmitHandler, useForm } from "react-hook-form";

interface CreateCommentFormData {
  description: string
}

interface CreateCommentProps {
  onSubmit: SubmitHandler<CreateCommentFormData>
}

export const CardCreateComment = ({ onSubmit }: CreateCommentProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors  },
  } = useForm<CreateCommentFormData>({
    mode: "onChange",
  });

  return (
    <div className="relative pt-4 flex gap-2 items-center">
      <div className="w-10 h-10 rounded-full overflow-hidden">
        <Image 
          width={40} 
          height={40} 
          src="/user-profile.svg" 
          alt="" 
          className="object-cover"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="relative w-full">
        <input
          id="description"
          {...register("description", {
            required: 'O campo é obrigatório',
            minLength: { value: 1, message: '' }
          })}
          className="outline-none py-4 px-4 bg-gray-200 rounded-xl w-full"
          type="text"
          placeholder="Faça um comentário..."
        />
        <button
          type="submit"
          className={`absolute top-2 right-2 rounded-full p-2 ${
            !isValid ? "cursor-not-allowed" : "hover:bg-gray-200"
          }`}
          disabled={!isValid}
          aria-label="Enviar comentário"
        >
          <Send color={isValid ? "#385898" : "#c4c4c4"} />
        </button>
      </form>
    </div>
  )
}