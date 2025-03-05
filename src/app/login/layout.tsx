import { ReactNode } from "react"

interface LayoutLoginProps {
  children: ReactNode
}

export default function LayoutLogin({ children }: LayoutLoginProps) {
  return (
    <div className="flex min-h-screen max-w-xl w-full mx-auto">
      { children}
    </div>
  )
}