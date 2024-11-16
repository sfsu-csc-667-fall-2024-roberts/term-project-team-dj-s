import express from "express";
import dotenv from "dotenv";
import * as path from "path";
import * as configuration from "./config";
import * as middleware from "./middleware";
import * as routes from "./routes";
import * as httpErrors from "http-errors";
import session from "express-session";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const pgSession = require("connect-pg-simple")(session);
const sessionStore = new pgSession({
  conString: process.env.DATABASE_URL,
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(process.cwd(), "src", "public")));

// Configurations
const staticPath = path.join(process.cwd(), "src", "public");
configuration.configureLiveReload(app, staticPath);
configuration.configureSession(app); // No change needed here


// Add this configuration for the view engine
app.set("views", path.join(process.cwd(), "src", "views")); // Path to your views directory
app.set("view engine", "ejs"); // Set EJS as the view engine

app.use(
    session({
      store: sessionStore,
      secret: process.env.SESSION_SECRET || "default_secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      },
    })
  );
  
// Routes
app.use("/", routes.home);
app.use("/auth", routes.auth);
app.use("/lobby", middleware.authentication, routes.mainLobby);
app.use("/games", middleware.authentication, routes.games);


// Error Handling
app.use((_req, _res, next) => next(httpErrors.NotFound()));

// Start Server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
