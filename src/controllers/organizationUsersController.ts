import {NextFunction, Request, Response} from "express";
import Controller from "./Controller";
import Organization from "../models/organization";
import db from "../models";
import OrganizationUser from "../models/organizationUser";
import {Enum} from "../models/enums/organizationUser";

class OrganizationUsersController extends Controller {
  async update (req: Request, res: Response, next: NextFunction) {
    const organizationUser: OrganizationUser = await db.OrganizationUser.findOne(
      {
        where: { organizationId: req.params.organizationId, userId: this.currentUser(res).id },
        include: [{ model: Organization, as: 'organization'} ],
        rejectOnEmpty: true
      }
    )
    const organization: Organization = await organizationUser.getOrganization()

    try {
      await organizationUser.update({ status: Enum.OrganizationUser.ACCEPT_STATUS.ACCEPT })
      req.flash('success', '組織に加入しました');
      res.redirect(`/organizations/${organization.id}`);
    } catch(e) {
      throw e
    }
  }
}

export default OrganizationUsersController
