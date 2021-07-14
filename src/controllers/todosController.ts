import {NextFunction, Request, Response} from "express";
import db from "../models";
import Organization from "../models/organization";
import {ValidationError} from "sequelize";
import Controller from "./Controller";
import User from "../models/user";
import OrganizationUser from "../models/organization_user";
import Todo from "../models/todo";
import {Enum} from "../models/enums/todo";

class OrganizationsController extends Controller {
  // async show (req: Request, res: Response, next: NextFunction) {
  //   const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })
  //   const user: User = await this.currentUser(res)
  //   const organizationUser: OrganizationUser = await db.OrganizationUser.findOne({ where: { organizationId: organization.id, userId: user.id }, rejectOnEmpty: true })
  //   const todo: Todo = await db.Todo.findOne({ where: { id: req.params.todoId, organizationUserId: organizationUser.id }, rejectOnEmpty: true })
  //
  //   res.render('todos/show', { organization, todo })
  // }

  async create (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })
    const user: User = await this.currentUser(res)
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne({ where: { organizationId: organization.id, userId: user.id }, rejectOnEmpty: true })
    const todo = await db.Todo.build({ title: req.body.title, description: req.body.description, status: Enum.Todo.STATUS_LEVEL.UNDONE, organizationUserId: organizationUser.id })
    const todos: Todo[] = await organizationUser.getTodos()

    try {
      await todo.save()
      req.flash('success', 'TODOを作成しました');
      res.redirect(`/organizations/${organization.id}`);
    } catch(e) {
      if (e instanceof ValidationError) {
        res.locals.validationError = e
        res.render(`/organizations/${organization.id}`, { organization, user, todos, todo, csrfToken: req.csrfToken() });
      } else {
        throw e
      }
    }
  }

  async edit (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })
    const user: User = await this.currentUser(res)
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne({ where: { organizationId: organization.id, userId: user.id }, rejectOnEmpty: true })
    const todo: Todo = await db.Todo.findOne({ where: { id: req.params.todoId, organizationUserId: organizationUser.id }, rejectOnEmpty: true })

    res.render('todos/edit', { organization, todo })
  }

  async update (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })
    const user: User = await this.currentUser(res)
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne({ where: { organizationId: organization.id, userId: user.id }, rejectOnEmpty: true })
    const todo: Todo = await db.Todo.findOne({ where: { id: req.params.todoId, organizationUserId: organizationUser.id }, rejectOnEmpty: true })

    try {
      await todo.update({ title: req.body.title, description: req.body.description })
      req.flash('success', 'TODOを更新しました');
      res.redirect(`/organizations/${organization.id}`);
    } catch(e) {
      if (e instanceof ValidationError) {
        res.locals.validationError = e
        res.render('todos/edit.ejs', { todo: todo, csrfToken: req.csrfToken() });
      } else {
        throw e
      }
    }
  }

  async status (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })
    const user: User = await this.currentUser(res)
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne({ where: { organizationId: organization.id, userId: user.id }, rejectOnEmpty: true })
    const todo: Todo = await db.Todo.findOne({ where: { id: req.params.todoId, organizationUserId: organizationUser.id }, rejectOnEmpty: true })

    try {
      await todo.update({ status: req.body.status })
      req.flash('success', 'TODOを更新しました');
      res.redirect(`/organizations/${organization.id}`);
    } catch(e) {
      throw e
    }
  }

  async destroy (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId, { rejectOnEmpty: true })
    const user: User = await this.currentUser(res)
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne({ where: { organizationId: organization.id, userId: user.id }, rejectOnEmpty: true })
    const todo: Todo = await db.Todo.findOne({ where: { id: req.params.todoId, organizationUserId: organizationUser.id }, rejectOnEmpty: true })

    await todo.destroy()

    req.flash('success', `組織[${organization.name}]を削除しました`);
    res.redirect(`/organizations/${organization.id}`);
  }
}

export default OrganizationsController
