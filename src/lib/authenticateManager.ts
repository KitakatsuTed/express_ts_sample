import {NextFunction, Request, Response} from "express";
import Organization from "../models/organization";
import db from "../models";
import User from "../models/user";

export default async function authenticateManager(req: Request, res: Response, next: NextFunction, user: User) {
  const organization: Organization = await db.Organization.findByPk(req.params.organizationId)
  if (await organization.isManager(user)) {
    return next()
  } else {
    req.flash('danger', 'アクセス権がありません')
    res.redirect('/')
  }
}
