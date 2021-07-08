import {NextFunction, Request, Response} from "express";

class Controller {
  authenticateUser (req: Request, res: Response, next: NextFunction) {
    if (!req.isAuthenticated()) {
      console.log('no login...')
      req.flash('danger', 'ログインしてください')
      res.redirect("/login");
    }
  }
}

export default Controller
