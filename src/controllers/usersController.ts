import {Request, Response} from "express";
import User from "../models/user";
import db from "../models";

class UsersController {

  async index (req: Request, res: Response) {
    res.render('users/index');
  }

  async newForm (req: Request, res: Response) {
    const user: User = db.User.build()
    res.render('users/new', { user: user });
  }

  async create (req: Request, res: Response) {
    const user = db.User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })

    try {
      await user.save()
      req.flash('info', `新規ユーザー[${user.fullName()}]を作成しました`);
      res.redirect('/users');
    } catch(e) {
      res.render('users/new.ejs', { user: user, e: e.message });
    }
  }
}

export default UsersController
