import { NextFunction, Request, Response } from "express";
import "express-session";

declare module "express-session" {
  interface SessionData {
    user: { id: number; username: string }; // Ensure the type matches everywhere
  }
}

const authenticationMiddleware = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.session.user) {
    // Redirect to login if no user is found in the session
    response.redirect("/auth/login");
  } else {
    // Pass user data to response.locals for use in views or further middleware
    response.locals.user = request.session.user;
    next();
  }
};

export default authenticationMiddleware;
