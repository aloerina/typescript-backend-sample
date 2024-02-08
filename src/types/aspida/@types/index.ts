/* eslint-disable */
export type UserPathParam = {
  userId: string
}

export type User = {
  id: string
} & NewUser

export type NewUser = {
  name: string
  email: string
}

export type Error = {
  message: string
}

export type UpdateUserReqBody = {
  name?: string | undefined
  email?: string | undefined
}

export type CreateUserReqBody = NewUser

export type UsersResponse = {
  users: User[]
}

export type UserResponse = {
  user: User
}

export type ErrorResponse = {
  errors: Error[]
}
