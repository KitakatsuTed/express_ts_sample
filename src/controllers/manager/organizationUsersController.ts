import {NextFunction, Request, Response} from "express";
import Controller from "../Controller";
import Organization from "../../models/organization";
import db from "../../models";
import User from "../../models/user";
import OrganizationUser from "../../models/organizationUser";
import {ValidationError} from "sequelize";
import Todo from "../../models/todo";
import {Enum} from "../../models/enums/organizationUser";

class OrganizationUsersController extends Controller {
  async show (req: Request, res: Response, next: NextFunction) {
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne(
      {
        where: { id: req.params.organizationUserId, organizationId: req.params.organizationId },
        include: [{ model: User, as: 'user' }, { model: Todo, as: 'todos' }, { model: Organization, as: 'organization'} ],
        rejectOnEmpty: true
      }
    )

    res.render('manager/organizationUsers/show', { organizationUser })
  }

  async newForm (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = db.Organization.build()
    res.render('manager/organizationUsers/new', { organization: organization, roleOption: Enum.OrganizationUser.MEMBER_ROLE })
  }

  async create (req: Request, res: Response, next: NextFunction) {
    const user: User | null = await db.User.findOne({ where: { email: [req.params.email] } })

    try {
      if (user) {

      }
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
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne(
      {
        where: { id: req.params.organizationUserId, organizationId: req.params.organizationId },
        include: [{ model: Organization, as: 'organization'} ],
        rejectOnEmpty: true
      }
    )

    res.render('organizations/edit', { organizationUser, roleOption: Enum.OrganizationUser.MEMBER_ROLE, csrfToken: req.csrfToken() })
  }

  async update (req: Request, res: Response, next: NextFunction) {
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne(
      {
        where: { id: req.params.organizationUserId, organizationId: req.params.organizationId },
        include: [{ model: Organization, as: 'organization'} ],
        rejectOnEmpty: true
      }
    )
    const organization: Organization = await organizationUser.getOrganization()

    try {
      await organizationUser.update({ role: req.body.role })
      req.flash('success', 'メンバー情報を更新しました');
      res.redirect(`/organizations/${organization.id}/organization_users/${organizationUser.id}`);
    } catch(e) {
      if (e instanceof ValidationError) {
        res.locals.validationError = e
        res.render('manager/organizationUsers/edit.ejs', { organizationUser, csrfToken: req.csrfToken(), roleOption: Enum.OrganizationUser.MEMBER_ROLE });
      } else {
        throw e
      }
    }
  }

  async destroy (req: Request, res: Response, next: NextFunction) {
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne(
      {
        where: { id: req.params.organizationUserId, organizationId: req.params.organizationId },
        include: [{ model: Organization, as: 'organization'}],
        rejectOnEmpty: true
      }
    )
    const user: User = await organizationUser.getUser()
    const organization: Organization = await organizationUser.getOrganization()
    await organizationUser.destroy()

    req.flash('success', `メンバー[${user.fullName()}]を削除しました`);
    res.redirect(`/organizations/${organization.id}`);
  }
}

export default OrganizationUsersController