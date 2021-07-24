import {NextFunction, Request, Response} from "express";
import User from "../models/user";

class Controller {
  authenticateUser (req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      console.log('no login...')
      req.flash('danger', 'ログインしてください')
      res.redirect("/login");
    }
    res.locals.currentUser = req.user as User
    next()
  }

  currentUser (res: Response) : User {
    return res.locals.currentUser
  }
}
export default Controller
