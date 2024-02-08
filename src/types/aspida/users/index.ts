/* eslint-disable */
import type * as Types from '../@types'

export type Methods = {
  /** ユーザの一覧を取得する */
  get: {
    status: 200

    /** Example response */
    resBody: {
      users: Types.User[]
    }

    resHeaders: {
    }
  }

  /** ユーザを作成する */
  post: {
    status: 200

    /**
     * {
     *   "users": {
     *     "id": "",
     *     
     *   }
     * }
     */
    resBody: {
      user: Types.User
    }

    reqBody: Types.CreateUserReqBody
  }
}
