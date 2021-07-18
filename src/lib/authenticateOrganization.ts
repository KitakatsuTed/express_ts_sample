import {NextFunction, Request, Response} from "express";
import Organization from "../models/organization";
import db from "../models";
import User from "../models/user";

export default async function authenticateOrganization(req: Request, res: Response, next: NextFunction) {
  const organization: Organization = await db.Organization.findByPk(req.params.organizationId)
  if (await organization.isMember(req.user as User)) {
    return next()
  } else {
    req.flash('danger', 'アクセス権がありません')
    res.redirect('/')
  }
}
