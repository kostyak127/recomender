import { BaseException } from '../../../exceptions/base.exception';

export type LogFunction = (message: any, ...optionalParams: any) => void;
export type ErrorLogFunction = (
  message: any,
  exception: BaseException,
  ...optionalParams: any
) => void;
