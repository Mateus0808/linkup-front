import { useState } from 'react'
// import { IconContext } from 'react-icons'
// import { BiLike } from 'react-icons/bi'
// import { GoComment } from 'react-icons/go'
// import { PostDbModel } from '../../services/post/type/post-response.interfacec'
// import { Comment } from '../comment/Comment'
// import { useAuthenticated } from '../../contexts/AuthContext'
// import { toggleLikePost } from '../../services/post/toggle-like-post.service'
// import { createCommentService } from '../../services/comment/create-comment.service'
// import { dateFormat } from '../../utils/dateFormat'
import { Ellipsis, Heart, MessageCircle, Send } from 'lucide-react'
import Image from 'next/image'
import { PostResponse } from '@/types/post.type'
import Link from 'next/link'
import { dateFormat } from '@/utils/dateFormat'
import { CardCreateComment } from '../comment/CardCreateComment'
import { Comment } from '../comment/CardComment'
import { useUserStore } from '@/store/userStore'
import { toggleLikeOnPostService } from '@/services/post'
import { createCommentService } from '@/services/comment'
import { SubmitHandler } from 'react-hook-form'
import { CommentType } from '@/types/comment.type'
import { PostMenu } from './menu-card'

interface PostProps {
  post: PostResponse
  addComment: (postId: string, comment: CommentType) => void
  toggleLike: (postId: string, userId: string) => void
  deleteComment: (postId: string, commentId: string) => void;
  path: 'timeline' | 'profile'
}

export const CardPost = ({ post, addComment, toggleLike, deleteComment, path }: PostProps) => {
  const { user } = useUserStore()
  const [fieldComment, setFieldComment] = useState(false)
  const [postMenu, setPostMenu] =useState(false)

  const toggleLikeOnPost = async () => {
    if (user && post) {
      await toggleLikeOnPostService(post.id);
      toggleLike(post.id, user.id);
    }
  };

  const handleCreateComment: SubmitHandler<{ description: string }> = async (
    data
  ) => {
    if (user && post) {
      const newComment = await createCommentService({
        postId: post.id,
        ...data,
      });
      if (newComment.data) {
        addComment(post.id, newComment.data);
      }
    }
    setFieldComment(false)
  };

  const includeLikeUserId = post?.likes?.includes(user?.id ?? '');
  const handlePostMenu = () => {
    setPostMenu(!postMenu)
  }

  return (
    <div className="relative bg-white p-4 border border-gray-300 rounded-xl shadow-md w-full max-w-[624px]">
      {user?.id === post?.user.id && path === 'profile' && (
        <div className='absolute top-4 right-4'>
          <button
            onClick={handlePostMenu}
            className='p-2 hover:bg-gray-200 rounded-full transition-all duration-100 transform'>
            <Ellipsis className='text-gray-700' />
          </button>
        </div>
      )}
      {postMenu && <PostMenu postId={post?.id} />}

      <div className="flex gap-4 items-center">
        <Image width={40} height={40} src="/user-profile.svg" alt="" />
        <div className="flex flex-col">
          <Link href={`/${post?.user.username}`} className='font-semibold hover:underline'>
            {post?.user.name}
          </Link>
          <span className="text-xs text-gray-600 font-semibold">
            {post && dateFormat(new Date(post?.createdAt))}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <span className="font-bold text-gray-700">{post?.title}</span>
        <span>{post?.description}</span>
        {post?.imageUrl && (
          <div className="w-full flex justify-center mt-4">
            <Image 
              alt="Publicação"
              height={300}
              width={500}
              className="rounded-lg object-cover max-w-full h-auto"
              src={`http://localhost:4000${post.imageUrl}`} 
            />
          </div>
        )}
        <div className="w-full py-2 flex justify-between items-center">
          <div className="flex gap-1 items-center group group-hover:bg-gray-200">
          <Heart  className='h-6 w-6 fill-[#0866FF] text-[#0866FF]' />
            <span>{post?.likes.length}</span>
          </div>
          <span className="text-gray-500 text-md">
            {post?.comments.length! > 1 
              ? `${post?.comments.length} comentários`
              : `${post?.comments.length} comentário`}
          </span>
        </div>
      </div>

      <div className='border-t-2 border-gray-300'></div>

      <div className="flex w-full">
        <button
          type="button"
          onClick={() => toggleLikeOnPost()}
          className="flex m-1 h-11 gap-4 w-1/2 items-center rounded-md justify-center hover:bg-gray-200 transition duration-100"
        >
          <Heart 
            fill={`${includeLikeUserId ? '#0866FF' : '#65676B'}`} 
            className='h-6 w-6' 
            color={`${includeLikeUserId ? '#0866FF' : '#65676B'}`}
          />
          <span className={`font-semibold ${includeLikeUserId ? 'text-blue-700' : 'text-[#65676B]'}`}>
            Curtir
          </span>
        </button>

        <button
          type="button"
          onClick={() => setFieldComment(!fieldComment)}
          className="flex m-1 h-11 gap-4 w-1/2 items-center rounded-md justify-center hover:bg-gray-200 transition duration-100"
        >
          <MessageCircle color='#65676B' className='h-6 w-6'/>
          <span className="font-semibold text-[#65676B]">Comentar</span>
        </button>
      </div>

      <div className='border-t-2 border-gray-300'></div>

      {fieldComment && post?.id && 
        <CardCreateComment onSubmit={handleCreateComment} />
      }
      {post && post.comments.length > 0 && (
        <div className="border-t-2">
          {post.comments.map((comment) => (
            <Comment
              key={comment.id}
              data={comment}
              postCreator={post.user}
              currentUserId={user?.id}
              deleteComment={deleteComment}
            />
          ))}   
        </div>
      )}
    </div>
  )
}