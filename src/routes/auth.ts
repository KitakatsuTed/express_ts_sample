import express, {NextFunction, Request, Response} from "express";
import passport from "passport"
import passportLocal from "passport-local"
import db from "../models";
import User from "../models/user";

const router = express.Router();
const LocalStrategy = passportLocal.Strategy

const loginCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    req.flash('alert', 'すでにログイン済みです')
    res.redirect("/");
  } else {
    next()
  }
}

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (username: string, password: string, done) => {
    try {
      const user: User | null = await db.User.findOne({where: {email: username}})

      if (!user) {
        return done(null, false);
      }
      if (!user.validPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (e) {
      return done(e);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (userTid: User, done) => {
  const user: User | null = await db.User.findByPk(userTid.id);
  if (!user) {
    return done(new Error('session data error'), null);
  }

  done(null, user);
});

router.get('/login', [loginCheck, (req: Request, res: Response) => {
  res.render('auth/login.ejs', { layout: false, loginMessage: req.flash("error") });
}])

router.post('/login', loginCheck)
router.post('/login', [loginCheck, passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'ログインしました',
    failureRedirect: '/login',
    failureFlash: 'ログインに失敗しました' // LocalStrategyの第2引数でメッセージを細かくコントロールできるようにすること
  })]
)

router.get('/logout', (req: Request, res: Response) => {
  req.logout();
  req.flash('success', 'ログアウトしました')
  res.redirect('/');
});

export default router
