import type {
  Request,
  Response,
  ErrorRequestHandler,
  NextFunction,
} from 'express';
import { HttpError } from 'express-openapi-validator/dist/framework/types';
import { logger } from './logger';
import { ErrorResponse } from '../types/aspida/@types';
import { ZodError } from 'zod';

const unexpectedErrorLogger = logger.child({ isUnexpectedError: true });

// express-openapi-validator の例外を処理するためのエラーハンドラ
export const eovErrorHandler: ErrorRequestHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 予期せぬ例外、ZodError は専用のハンドラで処理する
  if (err instanceof HttpError === false) return next(err);
  logger.error(err);
  const resBody: ErrorResponse = { errors: [] };
  // raise されたクラスによっては errors が存在しないものもあるみたいなので、その場合は message を使う
  if (err.errors === undefined) {
    resBody.errors = [{ message: err.message }];
  } else {
    resBody.errors = err.errors.map((error) => {
      return { message: error.message };
    });
  }
  return res.status(err.status).json(resBody);
};

// Zod の例外を処理するためのエラーハンドラ
export const zodErrorHandler: ErrorRequestHandler = (
  err: ZodError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  // 500 エラー(InternalServerError) は専用のハンドラで処理する
  if (err instanceof ZodError === false) return next(err);
  logger.error(err);
  const resBody: ErrorResponse = { errors: [] };
  // raise されたクラスによっては errors が存在しないものもあるみたいなので、その場合は message を使う
  if (err.errors === undefined) {
    resBody.errors = [{ message: err.message }];
  } else {
    resBody.errors = err.errors.map((error) => {
      return { message: error.message };
    });
  }
  return res.status(422).json(resBody);
};

// 予期せぬ例外が発生した場合、セキュリティ観点から余計な情報をレスポンスに載せないようメッセージの内容を制御する
export const unexpectedErrorHandler: ErrorRequestHandler = (
  err: HttpError,
  _req: Request,
  res: Response,
  // typescript-eslint の no-unused-vars に引っかかる (eslint の no-unused-vars は off にされている)
  // Issue はかなり昔からある模様。https://github.com/expressjs/generator/issues/78
  // `_req` は `_` をつけることで no-unused-vars を無視できたが、`_next` だけ何故か無視できなかった。
  // これまで特に意識せずに `_` で無視できていたので、それらしき rule がデフォルトで存在すると思っていたがそうではなさそう。
  // rule で argsIgnorePattern を明示的に指定すると無視できるようになった。
  // typescript-eslint の使い方の不理解か不具合の可能性があるが、一旦上記で対応。
  _next: NextFunction,
) => {
  unexpectedErrorLogger.error(err);
  const resBody: ErrorResponse = {
    errors: [{ message: 'InternalServerError' }],
  };
  return res.status(500).json(resBody);
};
