import {Request, Response} from "express";
import User from "../models/user";
import db from "../models";
import {ValidationError} from "sequelize";

class UsersController {

  async index (req: Request, res: Response) {
    const users: User[] = await db.User.findAll()

    res.render('users/index', { users });
  }

  async show (req: Request, res: Response) {
    const user: User = await db.User.findByPk(req.params.id)

    res.render('users/show', { user })
  }

  async newForm (req: Request, res: Response) {
    const user: User = db.User.build()
    res.render('users/new', { user, validationError: null });
  }

  async create (req: Request, res: Response) {
    const user = db.User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    })

    try {
      await user.save()
      req.flash('notice', `新規ユーザー[${user.fullName()}]を作成しました`);
      res.redirect('/users');
    } catch(e) {
      if (e instanceof ValidationError) {
        res.render('users/new.ejs', { user: user, validationError: e });
      } else {
        throw e
      }
    }
  }

  async edit (req: Request, res: Response) {
    const user: User = await db.User.findByPk(req.params.id)

    res.render('users/edit', { user, validationError: null })
  }

  async update(req: Request, res: Response) {
    const user: User = await db.User.findByPk(req.params.id)

    try {
      await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      })
      req.flash('notice', 'ユーザー情報を更新しました');
      res.redirect(`/users/${user.id}`);
    } catch(e) {
      if (e instanceof ValidationError) {
        res.render('users/edit.ejs', { user: user, validationError: e });
      } else {
        throw e
      }
    }
  }

  async destroy (req: Request, res: Response) {
    const user: User = await db.User.findByPk(req.params.id)

    user.destroy()
    req.flash('notice', `新規ユーザー[${user.fullName()}]を削除しました`);
    res.redirect("/users");
  }
}

export default UsersController
