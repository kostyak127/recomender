export type LogFunction = (message: any, ...optionalParams: any) => void;
export type ErrorLogFunction = (
  message: any,
  exception: Error,
  ...optionalParams: any
) => void;
