import express from 'express';
import httpErrors from 'http-errors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import dotenv from 'dotenv';
import { timeMiddleware } from "./middleware/time";
import connectLiveReload from "connect-livereload";
import livereload from "livereload";
import rootRoutes from './routes/root';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(timeMiddleware);
app.use(
  express.static(path.join(process.cwd(), "src", "public"))
 );
app.use(morgan('dev'));                
app.use(express.json());                 
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());                  


app.use(express.static(path.join(process.cwd(), 'src', 'public')));

app.set('views', path.join(process.cwd(), 'src', 'server', 'views'));
app.set('view engine', 'ejs');

app.use('/', rootRoutes);

app.use((_request, _response, next) => {
  next(httpErrors(404));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


const staticPath = path.join(process.cwd(), "src", "public");
app.use(express.static(staticPath));

if (process.env.NODE_ENV === "development") {
  const reloadServer = livereload.createServer();

  reloadServer.watch(staticPath);
  reloadServer.server.once("connection", () => {
    setTimeout(() => {
      reloadServer.refresh("/");
    }, 100);
  });
  app.use(connectLiveReload());
}


