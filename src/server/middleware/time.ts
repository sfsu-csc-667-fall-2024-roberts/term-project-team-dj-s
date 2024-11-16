import { NextFunction, Request, Response } from "express";

export const timeMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(`Time: ${new Date().toISOString()}`);
  next();
};
export default timeMiddleware;
