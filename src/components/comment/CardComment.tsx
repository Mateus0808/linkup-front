import { useRef, useState } from 'react'
import { Ellipsis } from 'lucide-react'
import { UserPost } from '@/types/user.type'
import { deleteCommentService } from '@/services/comment'
import { usePostStore } from '@/store/postStore'

interface CommentType {
  id: string
  description: string
  postId: string
  user: UserPost
  createdAt: string
  updatedAt: string
}

interface IComment {
  data: CommentType
  postCreator: UserPost
  currentUserId: string | undefined
  deleteComment: (postId: string, commentId: string) => void;
}

export const Comment = ({ data, postCreator, currentUserId, deleteComment }: IComment) => {
  const [options, setOptions] = useState(false)
  const catMenu = useRef<any>(null)

  const handleDeleteComment = async () => {
    const deletedComment = await deleteCommentService(data.id)
    if (!deletedComment) return null
    deleteComment(data.postId, data.id);
  };

  const closeOpenMenus = (e: any) => {
    if (catMenu.current && options && !catMenu.current.contains(e.target)) {
      setOptions(false)
    }
  }
  document.addEventListener('mousedown', closeOpenMenus)

  const editComment = () => {}

  return (
    <div
      className="flex gap-4 mt-2 items-start justify-start"
      ref={catMenu}
    >
      <img src="/user-profile.svg" alt="" className="h-8 w-8 rounded-full mt-1" />
      <div className="flex flex-col justify-start bg-gray-200 py-2 px-4 rounded-2xl">
        <span className="font-semibold">{data.user?.name}</span>
        <span>{data?.description}</span>
      </div>
      
      <div className="relative flex items-center justify-center h-16">
        <button
          onClick={(e) => setOptions(!options)}
          className="rounded-full p-2 hover:bg-gray-200 transition duration-100"
        >
          <Ellipsis />
        </button>
        {options && (
          <ul
            className="absolute min-w-[124px] -right-56 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-gray-300 ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabi-index="-1"
          >
            {
              data.user.id === currentUserId && (
                <li
                  className="flex flex-col items-center"
                  role="none"
                  key={`${data?.id}_edit`}
                >
                  <button className="p-2 w-full rounded-md hover:bg-gray-100">
                    Editar
                  </button>
                </li>
              )
            }
            { (postCreator.id === currentUserId || data.user.id === currentUserId ) && (
                <li
                  className="flex flex-col items-center"
                  role="none"
                  key={`${data?.id}_delete`}
                >
                  <button
                    onClick={handleDeleteComment}
                    className="p-2 w-full rounded-md hover:bg-gray-100"
                  >
                    Excluir
                  </button>
                </li>
              )
            }
          </ul>
        )}
      </div>
    
    </div>
  )
}