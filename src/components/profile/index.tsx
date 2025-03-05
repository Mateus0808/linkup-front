'use client'
import Image from 'next/image'
import { Camera, Pencil } from 'lucide-react'
import { UserResponse } from '@/types/user.type'
import { useUserStore } from '@/store/userStore'
import { useEffect, useState } from 'react'
import { addFriendService } from '@/services/user'
import { AddFriendButton } from './AddFriendButton'

interface ProfileProps {
  userPost: UserResponse | null
}

export const Profile = ({ userPost }: ProfileProps) => {
  const { user, fetchUser, setUser } = useUserStore();
  const [loadingFriend, setLoadingFriend] = useState(false)

  useEffect(() => {
    fetchUser();
  }, []);

  const handleAddFriend = async () => {
    if (userPost) {
      setLoadingFriend(true)
      const userFriend = await addFriendService(userPost?.id)
      setLoadingFriend(false)
      setUser(userFriend.data)
    }
  }

  const isUserFriend = user?.followings.includes(userPost?.id ?? '')

  return (
    <div className="z-0 w-full flex justify-center min-h-[400px] bg-white rounded-b-xl">
      <div className="flex flex-col justify-items-start items-center w-full p-8">

        <div className="relative flex items-center justify-center">
          <Image
            width={168}
            height={168}
            src="/user-profile.svg"
            alt=""
            className="rounded-full border-4 border-purple-800"
          />
          <Camera className='h-8 w-8 absolute top-30 left-30 bg-gray-200 rounded-full text-purple-800' />
        </div>
        
          
        <div className="flex flex-col w-full p-4">
          <p className="text-4xl text-gray-700 font-bold whitespace-nowrap flex justify-center">
            {userPost?.name}
          </p>
          <div className='flex gap-4 justify-center py-3'>
            <div className='p-3 bg-gray-200 rounded-xl'>
              <span className="font-semibold text-gray-700">
                Seguidores: {userPost?.followers.length}
              </span>
            </div>
            <div className='p-3 bg-gray-200 rounded-xl'>
              <span className="font-semibold text-gray-700">
                Seguindo: {userPost?.followings.length}
              </span>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-3 items-end justify-center md:justify-end">
          {user?.id !== userPost?.id && (
            <AddFriendButton 
              isUserFriend={isUserFriend}
              loadingFriend={loadingFriend}
              onClick={handleAddFriend}
            />
          )}

          {user?.id === userPost?.id && (
            <button 
              className="flex cursor-pointer border border-transparent items-center justify-center gap-2 bg-gray-200 rounded-md px-3 h-12 
              font-bold hover:bg-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all 
              duration-300 ease-in-out transform"
            >
              <Pencil className='text-gray-700' />
              <span className='font-semibold text-gray-700'>Editar perfil</span>
            </button>
          )}
        </div>

      </div>
    </div>
  )
}