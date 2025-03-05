import { CreatePostParams } from '@/types/post.type'
import { TextareaHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: keyof CreatePostParams
  register: UseFormRegister<CreatePostParams>
  error?: string
}

export const TextArea = ({ name, register, error, ...rest }: TextAreaProps) => {
  return (
    <div className='mb-4'>
      <textarea
        {...register(name)}
        name={name}
        {...rest}
        className={`w-full resize-none px-3 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } outline-none rounded text-2xl font-normal`}
      />
      {error && (
        <span className="text-red-500 text-sm mt-1">{error}</span>
      )}
    </div>
  )
}