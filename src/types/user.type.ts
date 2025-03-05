export interface ILoginProps {
  email: string
  password: string
  remember: boolean
}

export enum EnumUserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BANNED = 'BANNED'
}

export interface UserPost {
  id: string
  name: string
  username: string
  email: string
  createdAt: Date
}

export interface UserResponse {
  id: string
  name: string
  username: string
  email: string
  birthDate: Date
  maritalStatus: string
  phone: string
  gender: 'MALE' | 'FEMALE' | 'OTHER'
  followers: Array<string>
  followings: Array<string>
  status: EnumUserStatus
  createdAt: Date
  udpatedAt: Date
}