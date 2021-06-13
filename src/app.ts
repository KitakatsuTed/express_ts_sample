process.on('uncaughtException', function(err) {
  console.log(err);
  console.error(err.stack);
});

import createHttpError from "http-errors";
import express, {NextFunction, Request, Response} from 'express'
import path from 'path'
import fs from 'fs'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import flash from 'express-flash'
import session from 'express-session'
import expressLayouts from 'express-ejs-layouts'
import methodOverride from 'method-override'
import debug, {Debugger} from 'debug'

import routRouter from './routes/root';
import usersRouter from './routes/users';

const logDebugger: Debugger = debug(('develop'))

// .envはあればよみこまれ、なければ自動的に無視される
const ENV_PATH = path.join(__dirname, '../.env');
require('dotenv').config({ path: ENV_PATH });

if (fs.existsSync(ENV_PATH)) {
  console.log(`load env path: ${ENV_PATH}`)
} else {
  console.log(`not load env file. ${ENV_PATH} is not exists`)
}

const app = express();

// view engine setup
app.set('./views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session({
  secret: 'seqret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 180000
  }
}));

// @see http://expressjs.com/en/resources/middleware/method-override.html https://chaika.hatenablog.com/entry/2015/10/06/183604
app.use(methodOverride(function (req, _res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(methodOverride('_method', { methods: ['GET', 'POST'] })); // for GET Parameter

// flash messageの利用宣言
app.use(flash());
app.use(function(req,res,next){
  res.locals.flashMessage = {
    alert: req.flash("alert"),
    notice: req.flash("notice")
  }
  next()
})
// added middle ware

const logging = (req: Request, res: Response, next: NextFunction) => {
  const date = new Date()
  logDebugger("=================================================================")
  logDebugger(`Request: %o`, `${req.method} ${req.originalUrl}`)
  logDebugger(`Access Time: %o`, date.toString())
  logDebugger(`params: %o`, req.params)
  logDebugger(`body: %o`, req.body)
  logDebugger(`query: %o`, req.query)
  next()
}

app.use(logging)

////////////////////////////////////////

// userだと第一引数以下の階層を見る
app.use('/users', usersRouter);
// getは単一のパス
app.use('/', routRouter);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) =>
  next(createHttpError(404))
);

// error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  // request-responseサイクルのローカル変数（res.locals）はクライアントにレスポンスを返すまで参照することができる
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  debug(err.stack)
  // render the error page
  res.status(err.status || 500);
  res.render('errors');
})

export default app;
