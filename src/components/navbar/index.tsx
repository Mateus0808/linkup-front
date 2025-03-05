'use client'
import { useState, useEffect } from 'react'
import { LogOut, Menu, Search, Send, Settings } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { NavbarLink } from './NavbarLink'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'
import { UserResponse } from '@/types/user.type'
import { searchUserByUsername } from '@/services/user'

export const Navbar = () => {
  const { logout, user } = useUserStore()
  const router = useRouter()
  const [menu, setMenu] = useState(false)
  const [search, setSearch] = useState('')
  const [searchedUsers, setSearchedUsers] = useState<UserResponse[] | null>()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const searchUser = async () => {
    if (user?.id) {
      const response = await searchUserByUsername(search)
      setSearchedUsers(response.data)
    }
  }

  useEffect(() => {
    if (search.length <= 2) {
      setSearchedUsers(null)
      return
    }
    searchUser()
  }, [search])

  return (
    <nav className="flex px-4 h-16 items-center justify-between bg-white shadow-md">
      <div className="w-1/3">
        <span className="p-2 font-bold text-xl">Logo</span>
      </div>
      <div className="w-full flex justify-center">
        <div className="relative w-full max-w-xl items-center">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Search className='text-gray-600' />
          </span>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            name="search"
            id="search"
            placeholder="Faça uma pesquisa..."
            className="w-full outline-none h-12 px-10 py-1 rounded-4xl bg-gray-100"
          />
          <button
            type="button"
            onClick={() => searchUser()}
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 rounded-full}`
            }
            disabled={search.length <= 2}
          >
            <Send className='text-gray-600' />
          </button>
          
          {searchedUsers && searchedUsers?.length > 0 && (
            <div className="w-full z-50 absolute -bottom-16">
              {searchedUsers.map(user => (
                <Link
                  href={user.username}
                  key={user.id}
                  className="bg-white px-4 items-center flex gap-4 rounded-md h-14 hover:bg-gray-100 cursor-pointer"
                >
                  <Image src="/user-profile.svg" alt="" width={40} height={40} />
                  <span className="font-semibold">
                    {user.name}
                  </span>
              </Link>
              ))}
            </div>
          )}
          
        </div>
      </div>
      <div className="w-1/3 relative inline-block text-right">
        <button
          type="button"
          className="relative cursor-pointer inline-flex w-auto justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setMenu(!menu)}
        >
          <Menu />
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        
        {menu && (
          <div
            className="min-w-[344px] absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y rounded-md bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabi-index="-1"
          >
            <div className="py-2 mx-2 flex flex-col gap-3" role="none">
              <Link
                href={user?.username || ''}
                className="flex gap-4 items-center px-4 py-2 rounded-md hover:bg-gray-100"
              >
                <Image width={40} height={40} src="/user-profile.svg" alt="Profile" className="rounded" />
                <span className="font-semibold text-gray-700 whitespace-nowrap">
                  {user?.name}
                </span>
              </Link>
              <NavbarLink title="Configurações" href="" iconComponent={<Settings />} />
              <button
                onClick={handleLogout}
                className="flex rounded-md gap-4 items-center font-semibold text-base text-gray-700 w-full text-left min-h-[48px] px-4 py-1 hover:bg-gray-100"
                aria-label="Sair"
              >
                <div className='flex justify-center items-center h-12 w-12 rounded-full bg-gray-200'>
                  <LogOut />
                </div>
                <span className="font-semibold text-gray-700">Sair</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}