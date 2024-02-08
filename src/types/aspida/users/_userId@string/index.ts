/* eslint-disable */
import type * as Types from '../../@types'

export type Methods = {
  /** 指定したユーザ ID のユーザを取得する */
  get: {
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
  }

  /** 指定したユーザ ID のユーザ情報を更新する */
  patch: {
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

    reqBody: Types.UpdateUserReqBody
  }

  /** 指定したユーザ ID のユーザを削除する */
  delete: {
    status: 204
  }
}
