import type { AspidaClient, BasicHeaders } from 'aspida';
import type { Methods as Methods_18qsrps } from './health';
import type { Methods as Methods_1xhiioa } from './users';
import type { Methods as Methods_pxqx5v } from './users/_userId@string';

const api = <T>({ baseURL, fetch }: AspidaClient<T>) => {
  const prefix = (baseURL === undefined ? 'http://localhost:3000' : baseURL).replace(/\/$/, '');
  const PATH0 = '/health';
  const PATH1 = '/users';
  const GET = 'GET';
  const POST = 'POST';
  const DELETE = 'DELETE';
  const PATCH = 'PATCH';

  return {
    health: {
      /**
       * HTTP リクエストが受信できているかの動作確認
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_18qsrps['get']['status']>(prefix, PATH0, GET, option).send(),
      /**
       * HTTP リクエストが受信できているかの動作確認
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<void, BasicHeaders, Methods_18qsrps['get']['status']>(prefix, PATH0, GET, option).send().then(r => r.body),
      $path: () => `${prefix}${PATH0}`,
    },
    users: {
      _userId: (val1: string) => {
        const prefix1 = `${PATH1}/${val1}`;

        return {
          /**
           * 指定したユーザ ID のユーザを取得する
           * @returns {
           *   "users": {
           *     "id": "",
           *     
           *   }
           * }
           */
          get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_pxqx5v['get']['resBody'], BasicHeaders, Methods_pxqx5v['get']['status']>(prefix, prefix1, GET, option).json(),
          /**
           * 指定したユーザ ID のユーザを取得する
           * @returns {
           *   "users": {
           *     "id": "",
           *     
           *   }
           * }
           */
          $get: (option?: { config?: T | undefined } | undefined) =>
            fetch<Methods_pxqx5v['get']['resBody'], BasicHeaders, Methods_pxqx5v['get']['status']>(prefix, prefix1, GET, option).json().then(r => r.body),
          /**
           * 指定したユーザ ID のユーザ情報を更新する
           * @returns {
           *   "users": {
           *     "id": "",
           *     
           *   }
           * }
           */
          patch: (option: { body: Methods_pxqx5v['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_pxqx5v['patch']['resBody'], BasicHeaders, Methods_pxqx5v['patch']['status']>(prefix, prefix1, PATCH, option).json(),
          /**
           * 指定したユーザ ID のユーザ情報を更新する
           * @returns {
           *   "users": {
           *     "id": "",
           *     
           *   }
           * }
           */
          $patch: (option: { body: Methods_pxqx5v['patch']['reqBody'], config?: T | undefined }) =>
            fetch<Methods_pxqx5v['patch']['resBody'], BasicHeaders, Methods_pxqx5v['patch']['status']>(prefix, prefix1, PATCH, option).json().then(r => r.body),
          /**
           * 指定したユーザ ID のユーザを削除する
           */
          delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_pxqx5v['delete']['status']>(prefix, prefix1, DELETE, option).send(),
          /**
           * 指定したユーザ ID のユーザを削除する
           */
          $delete: (option?: { config?: T | undefined } | undefined) =>
            fetch<void, BasicHeaders, Methods_pxqx5v['delete']['status']>(prefix, prefix1, DELETE, option).send().then(r => r.body),
          $path: () => `${prefix}${prefix1}`,
        };
      },
      /**
       * ユーザの一覧を取得する
       * @returns Example response
       */
      get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody'], Methods_1xhiioa['get']['resHeaders'], Methods_1xhiioa['get']['status']>(prefix, PATH1, GET, option).json(),
      /**
       * ユーザの一覧を取得する
       * @returns Example response
       */
      $get: (option?: { config?: T | undefined } | undefined) =>
        fetch<Methods_1xhiioa['get']['resBody'], Methods_1xhiioa['get']['resHeaders'], Methods_1xhiioa['get']['status']>(prefix, PATH1, GET, option).json().then(r => r.body),
      /**
       * ユーザを作成する
       * @returns {
       *   "users": {
       *     "id": "",
       *     
       *   }
       * }
       */
      post: (option: { body: Methods_1xhiioa['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1xhiioa['post']['resBody'], BasicHeaders, Methods_1xhiioa['post']['status']>(prefix, PATH1, POST, option).json(),
      /**
       * ユーザを作成する
       * @returns {
       *   "users": {
       *     "id": "",
       *     
       *   }
       * }
       */
      $post: (option: { body: Methods_1xhiioa['post']['reqBody'], config?: T | undefined }) =>
        fetch<Methods_1xhiioa['post']['resBody'], BasicHeaders, Methods_1xhiioa['post']['status']>(prefix, PATH1, POST, option).json().then(r => r.body),
      $path: () => `${prefix}${PATH1}`,
    },
  };
};

export type ApiInstance = ReturnType<typeof api>;
export default api;
