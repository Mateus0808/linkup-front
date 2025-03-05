import Link from "next/link"
import { ReactNode } from "react"

interface LinkNavbarProps {
  href: string
  label: string
  children: ReactNode
}

export const LinkNavbar = ({ href, children, label }: LinkNavbarProps) => {
  return (
    <li className="rounded-xl hover:bg-gray-200 px-2 py-4">
      <Link href={href} className="flex gap-4 items-center font-semibold text-gray-900">
        {children}
        <span className="font-medium hidden xl:block">{label}</span>
      </Link>
    </li>
  )
}