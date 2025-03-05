import { CommentType } from "./comment.type"
import { UserPost } from "./user.type"

export interface CreatePostParams {
  title: string
  description: string
  image?: FileList
}

export interface PostResponse {
  id: string
  user: UserPost
  title: string
  description: string
  imageUrl: string
  comments: CommentType[]
  likes: string[]
  createdAt: string
  updatedAt: string
}
