import {NextFunction, Request, Response} from "express";
import User from "../models/user";
import Controller from "./Controller";
import Organization from "../models/organization";

class DashboardController extends Controller {
  async index (req: Request, res: Response, next: NextFunction) {
    const user: User = this.currentUser(res)
    const organizations: Organization[] = await user.getOrganizations()

    res.render('dashboard', { user, organizations });
  }
}

export default DashboardController
