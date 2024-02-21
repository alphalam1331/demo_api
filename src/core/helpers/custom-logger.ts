import { NextFunction, Request, Response } from 'express';

export const customLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  console.info(`Receiving request:`);
  console.info(req.method, req.url, req.body);
  console.info('User Agent: ', req.headers['user-agent']);
  next();
};
