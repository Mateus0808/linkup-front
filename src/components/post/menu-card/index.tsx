import { deletePostService } from "@/services/post"
import { ButtonPostMenu } from "./ButtonPostMenu"
import { useProfileStore } from "@/store/userProfile"

interface PostMenuProps {
  postId: string
}

export const PostMenu = ({ postId }: PostMenuProps) => {
  const { deletePost } = useProfileStore()

  const handleDeletePost = async () => {
    const response = await deletePostService(postId)
    if (response) {
      deletePost(postId);
    }
  }

  const handleUpdatePost = async () => {
    // const response = await deletePostService(postId)
   
  }

  return (
    <ul className='absolute right-4 top-14 w-52 p-2 bg-white shadow-xl shadow-neutral-300 rounded-xl'>
      <ButtonPostMenu onClick={handleUpdatePost} label="Editar post"/>
      <ButtonPostMenu onClick={handleDeletePost} label="Excluir post"/>
    </ul>
  )
}