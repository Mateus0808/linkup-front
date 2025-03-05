import { apiService } from "../axios.service"

export interface CreateUserData {
  name: string
  email: string
  username: string
  password: string
  birthDate: Date
}

export const createUserService = async (data: CreateUserData) => {
  try {
    const response = await apiService.post('/users', data)

    return response.data
  } catch(error: any) {
    return error.response.data
  }
}


export const getUserService = async (userId: string) => {
  try {
    const response = await apiService.get(`/users/${userId}`)

    return response.data
  } catch(error: any) {
    return error.response.data
  }
}

export const findUsersService = async (username: string) => {
  try {
    const response = await apiService.get(`/users?username=${username}`)

    return response.data
  } catch(error: any) {
    return error.response.data
  }
}

export const addFriendService = async (userId: string) => {
  try {
    const response = await apiService.post(`/users/follow/${userId}`)

    return response.data
  } catch(error: any) {
    return error.response.data
  }
}


export const searchUserByUsername = async (username: string) => {
  try {
    const response = await apiService.get(`/users?username=${username}`)

    return response.data
  } catch(error: any) {
    return error.response.data
  }
}