import {Request, Response} from "express";
import db from "../models";
import Organization from "../models/organization";
import {ValidationError} from "sequelize";
import Controller from "./Controller";

class OrganizationsController extends Controller {
  async show (req: Request, res: Response) {
    const organization: Organization = db.Organization.findByPk(req.params.id)

    res.render('organizations/show', { organization })
  }

  async newForm (req: Request, res: Response) {
    const organization: Organization = new Organization()
    res.render('organizations/new', { organization: organization, validationError: null })
  }

  async create (req: Request, res: Response) {
    const organization = db.User.buildOrganizationUser({
      name: req.body.name
    })

    try {
      await organization.save()
      req.flash('success', '組織を作成しました');
      res.redirect(`/organizations/${organization.id}`);
    } catch(e) {
      if (e instanceof ValidationError) {
        res.render('organizations/new.ejs', { organization: organization, validationError: e, csrfToken: req.csrfToken() });
      } else {
        throw e
      }
    }
  }

  async edit (req: Request, res: Response) {
    const organization: Organization = db.Organization.findByPk(req.params.id)

    res.render('organizations/edit', { organization })
  }

  async update (req: Request, res: Response) {
    const organization: Organization = db.Organization.findByPk(req.params.id)

    try {
      await organization.update({
        name: req.body.name
      })
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

  async destroy (req: Request, res: Response) {
    const organization: Organization = db.Organization.findByPk(req.params.id)

    organization.destroy()
    req.flash('success', `組織[${organization.name}]を削除しました`);
    res.redirect("/");
  }
}

export default OrganizationsController
