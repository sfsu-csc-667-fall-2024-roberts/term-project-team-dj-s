import express, { Application } from 'express'; // Import Application type
import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import flash from 'express-flash';

const configureSession = (app: Application) => {
  app.use(
    session({
      store: new (connectPgSimple(session))({ createTableIfMissing: true }),
      secret: process.env.SESSION_SECRET || 'default_secret', // <-- Add secret here
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(flash());
};

export default configureSession;
