'use client'
import { useState } from 'react'
import { X } from 'lucide-react'

import { createPostService } from '@/services/post'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useUserStore } from '@/store/userStore'
import { TextArea } from '../TextArea'
import Image from 'next/image'
import { Button } from '../Button'
import { errorNotify } from '@/utils/notify'

interface PostModalProps {
  setPostModal: (value: boolean) => void
}

interface CreatePostFormData {
  title: string
  description: string
  image?: FileList
}

export const CreatePostModal = ({ setPostModal }: PostModalProps) => {
  const { user } = useUserStore()
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePostFormData>();

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<CreatePostFormData> = async (data) => {
    if (!user) return
    if (data.description.length <= 1) return

    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('title', data.title);
    formData.append('description', data.description);

    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    for (const [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      setLoading(true)
      const response = await createPostService(formData);
      console.log('response', response)
      if (response.statusCode != 201) {
        errorNotify(response.message)
        return
      }
      setPostModal(false);
      // window.location.reload(); 
    } catch (error) {
      console.error('Erro ao criar o post:', error);
    } finally {
      setLoading(false)
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); 
    }
  };

  return (
    <div className="z-10 fixed inset-0 flex items-center justify-center">
      <div className="z-0 absolute inset-0 bg-black opacity-60"></div> 

      <div className="z-10 bg-white w-2/5 p-4 rounded-lg shadow-lg">
        <div className="flex relative items-center justify-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700 text-center">Criar Publicação</h2>
          <button
            onClick={() => setPostModal(false)}
            className="flex absolute right-0"
          >
            <X className='h-10 w-10 p-1 bg-gray-200 rounded-3xl cursor-pointer hover:bg-gray-300' />
          </button>
        </div>
        <div className="border-b border-gray-300 mt-2 mb-2"></div>
        <div>
          <div className="flex gap-4 items-center">
            <Image width={42} height={42} src="/user-profile.svg" alt="" className='rounded-full object-cover' />
            <span className="font-semibold text-gray-700">{user?.name}</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data' className='flex flex-col gap-2 my-4'>
            <input 
              type='text' 
              className="w-full px-3 py-2 border border-gray-300 rounded
                outline-none text-2xl font-normal"
              {...register('title')} 
              placeholder='Título da postagem'
            />
            <TextArea
              register={register}
              name="description"
              placeholder={`No que você está pensando, ${user?.name}?`}
              rows={4}
              error={errors.description?.message}
            />

            <div className="mb-4">
              <input
                type="file"
                {...register('image')}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer bg-gray-200 hover:bg-gray-300 p-3 rounded-xl text-gray-900 
                hover:text-gray-800 transition-all duration-200"
              >
                Adicionar imagem
              </label>
              {selectedImage && (
                <div className="mt-2 flex justify-center w-full">
                  <Image
                    width={200}
                    height={200}
                    src={imagePreview || ""}
                    alt="Imagem selecionada"
                    className="object-cover max-w-full h-auto rounded-lg"
                  />
                </div>
              )}
            </div>

            <Button label='Publicar' loading={loading} />
          </form>
        </div>
      </div>
    </div>
  )
}