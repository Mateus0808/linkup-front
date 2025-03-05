'use client'
import { Home, UserRound, Users } from "lucide-react"
import { LinkNavbar } from "./LinkNavbar"
import { useUserStore } from "@/store/userStore"

export const Sidebar = () => {
  const { user } = useUserStore()

  return (
    <div className="sticky top-0 left-0 p-4 h-[calc(100vh-4rem)] w-min xl:w-96">
      <ul className='w-min xl:w-full'>
        <LinkNavbar  href="/" label="Página Inicial">
          <Home className="text-purple-800" />
        </LinkNavbar>
        <LinkNavbar href={user?.username || ""} label="Mateus dos Santos">
          <img src="/user-profile.svg" alt="Profile" className="h-6 w-6" />{' '}
        </LinkNavbar>
      </ul>

      <div className="border-b border-gray-300 mt-2 mb-2"></div>{' '}

      <ul>
        <LinkNavbar  href="/friends" label="Amigos">
          <Users className="fill-purple-800 text-purple-800" />
        </LinkNavbar>
        <LinkNavbar href="/friend-requests" label="Solicitações">
          <UserRound className="fill-purple-800 text-purple-800" />
        </LinkNavbar>
      </ul>
    </div>
  )
}