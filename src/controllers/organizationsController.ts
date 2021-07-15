import {NextFunction, Request, Response} from "express";
import db from "../models";
import Organization from "../models/organization";
import {ValidationError} from "sequelize";
import Controller from "./Controller";
import User from "../models/user";
import Todo from "../models/todo";
import OrganizationUser from "../models/organizationUser";
import {Enum} from "../models/enums/todo";

class OrganizationsController extends Controller {
  async show (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })
    const users: User[] = await organization.getUsers()
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne(
      { where: { userId: this.currentUser(res).id, organizationId: organization.id }, rejectOnEmpty: true }
      )
    const todos: Todo[] = await organizationUser.getTodos()
    const todo: Todo = new Todo()

    res.render('organizations/show', { organization, users, todo, todos, csrfToken: req.csrfToken(), statusLevel: Enum.Todo.STATUS_LEVEL })
  }

  async newForm (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = db.Organization.build()
    res.render('organizations/new', { organization: organization })
  }

  async create (req: Request, res: Response, next: NextFunction) {
    // 保存に失敗した時のorganizationオブジェクトどうする?
    try {
      const organization = await db.Organization.createWithUser({ name: req.body.name }, this.currentUser(res))
      req.flash('success', '組織を作成しました');
      res.redirect(`/organizations/${organization.id}`);
    } catch(e) {
      const organization = db.Organization.build({ name: req.body.name })

      if (e instanceof ValidationError) {
        res.locals.validationError = e
        res.render('organizations/new.ejs', { organization: organization, csrfToken: req.csrfToken() });
      } else {
        throw e
      }
    }
  }

  async edit (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })

    res.render('organizations/edit', { organization })
  }

  async update (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })

    try {
      await organization.update({ name: req.body.name })
      req.flash('success', '組織情報を更新しました');
      res.redirect(`/organizations/${organization.id}`);
    } catch(e) {
      if (e instanceof ValidationError) {
        res.locals.validationError = e
        res.render('organizations/edit.ejs', { organization: organization, csrfToken: req.csrfToken() });
      } else {
        throw e
      }
    }
  }

  async destroy (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })
    await organization.destroy()

    req.flash('success', `組織[${organization.name}]を削除しました`);
    res.redirect("/organizations");
  }
}

export default OrganizationsController
