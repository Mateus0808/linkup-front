import { CreateCommentParams } from "@/types/comment.type"
import { apiService } from "../axios.service"


export const createCommentService = async (data: CreateCommentParams) => {
  try {
    const response = await apiService.post('/comments', data)
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.data.response.message
  }
}

export const deleteCommentService = async (commentId: string) => {
  try {
    const response = await apiService.delete(`/comments/${commentId}`)
    return response.data
  } catch (error: any) {
    console.log(error)
    return error.response.data.message
  }
}