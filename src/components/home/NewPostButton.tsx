'use client'
import { UserResponse } from "@/types/user.type"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { CreatePostModal } from "../post/CreatePostModal"

export interface NewPostButtonProps {
  user: UserResponse | null
}

export const NewPostButton = ({ user }: NewPostButtonProps) => {
  const [postModal, setPostModal] = useState(false)

  return (
    <>
      {postModal && <CreatePostModal setPostModal={setPostModal} />}
      <div className="mb-4 flex flex-col gap-4 bg-white p-4 rounded-xl shadow-md max-w-[624px]">
        <div className="flex items-center gap-4">
          <Image
            width={40}
            height={40}
            src="/user-profile.svg" 
            alt="Foto do perfil" 
            className="rounded" 
          />
          <button 
            className="w-full text-lg text-left text-gray-400 p-4 border-none outline-none bg-gray-100 rounded-2xl"
            onClick={() => setPostModal(!postModal)}
          >
            No que você está pensando, {user?.name}?
          </button>
        </div>
        <div className="h-[1px] w-full bg-gray-200"></div>
        <div className="grid md:grid-cols-3">
          <button onClick={() => setPostModal(true)} className="flex items-center gap-2 p-3 rounded-xl hover:bg-gray-100">
            <ImageIcon className="text-green-600" />
            <span className="text-gray-500 font-bold text-nowrap">Adicionar foto</span>
          </button>
        </div>
      </div>    
    </>
  )
}