'use client'
import { NewPostButton } from '@/components/home/NewPostButton'
import { LoadingComponent } from '@/components/loading'
import { CardPost } from '@/components/post/CardPost'
import { Profile } from '@/components/profile'
import { getUserPosts } from '@/services/post'
import { findUsersService, getUserService } from '@/services/user'
import { useProfileStore } from '@/store/userProfile'
import { useUserStore } from '@/store/userStore'
import { UserResponse } from '@/types/user.type'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UserProfilePage() {
  const { user } = useUserStore()
  const { username } = useParams()
  const { setPosts, posts, addComment, toggleLike, deleteComment } = useProfileStore()

  const [userPost, setUserPost] = useState<UserResponse | null>(null)
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUserPosts = async () => {
      setLoading(true)
      const response = await getUserPosts(String(username))
      const user = await findUsersService(String(username))

      setPosts(response.data)
      setUserId(user.data[0].id)
      setLoading(false)
    }
    fetchUserPosts()
  }, [username])

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        const response = await getUserService(userId)
        setUserPost(response.data)
      }
      fetchUserData()
    }
  }, [userId])
 
  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        {loading ? (
          <div className='w-full flex justify-center'>
            <LoadingComponent />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center gap-8">
            <Profile userPost={userPost} />

            <div className="flex justify-center w-full px-8 gap-8 pb-8">
              <div className='flex flex-col gap-4 w-full max-w-2xl'>
                { (user && userPost) && (user.id === userPost.id) && <NewPostButton user={userPost} /> }
                {posts && posts.map((post) => 
                  <CardPost 
                    post={post} 
                    key={post.id}
                    path="profile"
                    addComment={addComment}
                    toggleLike={toggleLike}
                    deleteComment={deleteComment}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}