import {NextFunction, Request, Response} from "express";
import db from "../models";
import Organization from "../models/organization";
import {ValidationError} from "sequelize";
import Controller from "./Controller";
import User from "../models/user";

class OrganizationsController extends Controller {
  async index(req: Request, res: Response, next: NextFunction) {
    const organizations: Organization[] = await this.currentUser(res).getOrganizations()

    res.render('organizations/index', { organizations })
  }

  async show (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.id, { rejectOnEmpty: true })
    const users: User[] = await organization.getUsers()

    res.render('organizations/show', { organization, users })
  }

  async newForm (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = db.Organization.build()
    res.render('organizations/new', { organization: organization, validationError: null })
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
        res.render('organizations/new.ejs', { organization: organization, validationError: e, csrfToken: req.csrfToken() });
      } else {
        throw e
      }
    }
  }

  async edit (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.id, { rejectOnEmpty: true })

    res.render('organizations/edit', { organization, validationError: null })
  }

  async update (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.id, { rejectOnEmpty: true })

    try {
      await organization.update({ name: req.body.name })
      req.flash('success', '組織情報を更新しました');
      res.redirect(`/organizations/${organization.id}`);
    } catch(e) {
      if (e instanceof ValidationError) {
        res.render('organizations/edit.ejs', { organization: organization, validationError: e, csrfToken: req.csrfToken() });
      } else {
        throw e
      }
    }
  }

  async destroy (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.id, { rejectOnEmpty: true })
    await organization.destroy()

    req.flash('success', `組織[${organization.name}]を削除しました`);
    res.redirect("/organizations");
  }
}

export default OrganizationsController
