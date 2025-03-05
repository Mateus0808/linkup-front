import { PostResponse } from "@/types/post.type"
import { apiService } from "../axios.service"

interface CreatePostParams {
  userId: string
  title: string
  description: string
  image?: File
}

export const getUserPosts = async (username: string): Promise<PostResponse[] | any> => {
  try {
    const userPosts = await apiService.get(`/posts/user/${username}`)
    return userPosts.data
  } catch (error: any) {
    return error.data.message
  }
}

export const createPostService = async (data: FormData) => {
  try {
    console.log('data', data)
    const response = await apiService.post('/posts', data)
    return response.data
  } catch (error: any) {
    console.log('error', error)
    return error.response.data
  }
}

export const deletePostService = async (postId: string) => {
  try {
    const response = await apiService.delete(`/posts/${postId}`)
    return response.data
  } catch (error: any) {
    console.log('error', error)
    return error.response.data
  }
}

export const toggleLikeOnPostService = async (postId: string) => {
  try {
    const response = await apiService.post(`/posts/like/${postId}`)
    return response.data
  } catch (error: any) {
    console.log("User posts", error)
  }
}