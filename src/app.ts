// プロジェクトの設定ファイル ミドルウェアとかの設定とかできるはず

import createHttpError from "http-errors";
import express, {NextFunction, Request, Response} from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import routRouter from './routes/root';
import usersRouter from './routes/users';

// .evnはあればよみこまれ、なければ自動的に無視される
const ENV_PATH = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_PATH });

const app = express();

// view engine setup
app.set('./views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// userだと第一引数以下の階層を見る
app.use('/users', usersRouter);
// getは単一のパス
app.use('/', routRouter);

app.get('*', function (req, res) {
  res.render('errors');
})

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) =>
  next(createHttpError(404))
);

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

export default app;
