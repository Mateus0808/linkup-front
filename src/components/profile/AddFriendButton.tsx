import { UserPlus } from "lucide-react";
import { LoadingComponent } from "../loading";

interface AddFriendButtonProps {
  loadingFriend: boolean;
  isUserFriend: boolean | undefined; 
  onClick: () => void;
}

export const AddFriendButton = ({
  loadingFriend,
  isUserFriend,
  onClick,
}: AddFriendButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={loadingFriend}
      aria-label={isUserFriend ? "Amigo adicionado" : "Adicionar amigo"}
      className="cursor-pointer font-bold flex gap-2 items-center justify-center px-3 h-12 border border-transparent rounded-xl
        text-gray-300 bg-purple-800 hover:bg-purple-700 focus:outline-none 
        focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 
        ease-in-out transform hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loadingFriend ? (
        <LoadingComponent />
      ) : isUserFriend ? (
        "Amigo adicionando"
      ) : (
        <>
          <UserPlus />
          Adicionar amigo
        </>
      )}
    </button>
  );
};