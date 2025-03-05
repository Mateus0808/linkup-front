import { UserPost } from "./user.type"

export interface CreateCommentParams {
  postId: string
  description: string
}

export interface CommentType {
  id: string
  description: string
  postId: string
  user: UserPost
  createdAt: string
  updatedAt: string
}