import {NextFunction, Request, Response} from "express";
import User from "../models/user";
import db from "../models";
import {ValidationError} from "sequelize";

export default class RegistratesController {
  async newForm (req: Request, res: Response, next: NextFunction) {
    const user: User = db.User.build()
    res.render('registrates/new', { user, csrfToken: req.csrfToken(), layout: 'layouts/simpleLayout.ejs' });
  }

  async create (req: Request, res: Response, next: NextFunction) {
    const user = db.User.build({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })

    try {
      await user.save()
      req.flash('success', '登録が完了しました。ログインしてください。');
      res.redirect('/login');
    } catch(e) {
      if (e instanceof ValidationError) {
        res.locals.validationError = e
        res.render('registrates/new.ejs', { user: user, csrfToken: req.csrfToken() });
      } else {
        throw e
      }
    }
  }

  async edit (req: Request, res: Response, next: NextFunction) {
    // ログインチェックされている前提なのでタイプキャストしたけどこれでいいかどうか
    // ログインチェック通過したら実行時エラーが起きる可能性があるので怖い
    const user: User = req.user as User
    res.render('registrates/edit', { user: user, csrfToken: req.csrfToken() })
  }

  async update(req: Request, res: Response, next: NextFunction) {
    const user: User = req.user as User

    try {
      await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      })
      req.flash('success', 'ユーザー情報を更新しました');
      res.redirect(`/users/${user.id}`);
    } catch(e) {
      if (e instanceof ValidationError) {
        res.locals.validationError = e
        res.render('registrates/edit.ejs', { user: user, csrfToken: req.csrfToken() });
      } else {
        throw e
      }
    }
  }

  async destroy (req: Request, res: Response, next: NextFunction) {
    const user: User = await db.User.findByPk(req.params.id, { rejectOnEmpty: true })

    user.destroy()
    req.flash('success', `ユーザー[${user.fullName()}]を削除しました`);
    res.redirect("/users");
  }
}
