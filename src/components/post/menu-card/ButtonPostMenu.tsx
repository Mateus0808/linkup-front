
interface ButtonPostMenuProps {
  label: string
  onClick: () => Promise<void>
}

export const ButtonPostMenu = ({ label, onClick }: ButtonPostMenuProps) => {
  return (
    <li className="font-semibold text-gray-700 hover:bg-gray-100 rounded-xl transition-all duration-100">
      <button onClick={onClick} className="flex justify-items-start p-3 px-4 w-full">
        {label}
      </button>
    </li>
  )
}