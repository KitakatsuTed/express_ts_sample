import {NextFunction, Request, Response} from "express";
import Controller from "../Controller";
import Organization from "../../models/organization";
import db from "../../models";
import User from "../../models/user";
import OrganizationUser from "../../models/organizationUser";
import {ValidationError, ValidationErrorItem} from "sequelize";
import Todo from "../../models/todo";
import {Enum} from "../../models/enums";
import OrganizationMailer from "../../mailers/organizationMailer";

class OrganizationUsersController extends Controller {
  async show (req: Request, res: Response, next: NextFunction) {
    const organizationUser: OrganizationUser = await db.OrganizationUser.scope('accept').findOne(
      {
        where: { id: req.params.organizationUserId, organizationId: req.params.organizationId },
        include: [{ model: User, as: 'user' }, { model: Todo, as: 'todos' }, { model: Organization, as: 'organization'} ],
        rejectOnEmpty: true
      }
    )

    res.render('manager/organizationUsers/show', { organizationUser, csrfToken: req.csrfToken() })
  }

  async newForm (req: Request, res: Response, next: NextFunction) {
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId)
    res.render('manager/organizationUsers/new', { organization: organization, roleOption: Enum.OrganizationUser.MEMBER_ROLE })
  }

  async create (req: Request, res: Response, next: NextFunction) {
    const user: User | null = await db.User.findOne({where: {email: [req.body.email]}})
    const organization: Organization = await db.Organization.findByPk(req.params.organizationId)
    if (!(user instanceof User)) {
      req.flash('danger', 'ユーザーが見つかりませんでした');
    } else if(await db.OrganizationUser.findOne({ where: { userId: user.id, organizationId: organization.id } })) {
      req.flash('danger', 'すでに招待済みです');
    } else if (user) {
      const organizationUser: OrganizationUser = await organization.createOrganizationUser({ userId: user.id })
      await OrganizationMailer.inviteMember(organizationUser)
      req.flash('success', 'ユーザーに招待メッセージを送信しました');
    }

    res.redirect(`/organizations/${organization.id}`);
  }

  async edit (req: Request, res: Response, next: NextFunction) {
    const organizationUser: OrganizationUser = await db.OrganizationUser.scope('accept').findOne(
      {
        where: { id: req.params.organizationUserId, organizationId: req.params.organizationId },
        include: [{ model: Organization, as: 'organization'} ],
        rejectOnEmpty: true
      }
    )

    res.render('manager/organizationUsers/edit', { organizationUser, roleOption: Enum.OrganizationUser.MEMBER_ROLE, csrfToken: req.csrfToken() })
  }

  async update (req: Request, res: Response, next: NextFunction) {
    const organizationUser: OrganizationUser = await db.OrganizationUser.scope('accept').findOne(
      {
        where: { id: req.params.organizationUserId, organizationId: req.params.organizationId },
        include: [{ model: Organization, as: 'organization'} ],
        rejectOnEmpty: true
      }
    )
    const organization: Organization = await organizationUser.getOrganization()

    try {
      const managerCount: number = await organization.countOrganizationUsers({ where: { role: Enum.OrganizationUser.MEMBER_ROLE.MANAGER } })
      if (managerCount == 1 && req.body.role == 'normal' && organizationUser.isRoleManager()) {
        req.flash('danger', 'マネージャーは一人以上必要です');
        return res.redirect(`/organizations/${organization.id}/organization_users/${organizationUser.id}/edit`)
      }

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
    const organizationUser: OrganizationUser = await db.OrganizationUser.scope('accept').findOne(
      {
        where: { id: req.params.organizationUserId, organizationId: req.params.organizationId },
        include: [{ model: Organization, as: 'organization'}],
        rejectOnEmpty: true
      }
    )
    const organization: Organization = await organizationUser.getOrganization()

    if (organizationUser.isRoleManager()) {
      req.flash('danger', 'マネージャーは削除不可です');
      return res.redirect(`/organizations/${organization.id}/organization_users/${organizationUser.id}`)
    }

    const user: User = await organizationUser.getUser()
    await organizationUser.destroy()

    req.flash('success', `メンバー[${user.fullName()}]を削除しました`);
    res.redirect(`/organizations/${organization.id}`);
  }
}

export default OrganizationUsersController
