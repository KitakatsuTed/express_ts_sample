import {Request, Response} from "express";
import User from "../models/user";
import db from "../models";

class UsersController {

  index (req: Request, res: Response) {
    res.render('users/index');
  }

  newForm (req: Request, res: Response) {
    const user: User = db.User.build()

    res.render('users/new', { user: user });
  }

  create (req: Request, res: Response) {
    // req.flash('info', `新規チーム[${team.name}]を作成しました`);
    res.redirect('/users');
  }
}

export default UsersController