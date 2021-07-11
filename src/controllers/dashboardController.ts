import {NextFunction, Request, Response} from "express";
import User from "../models/user";
import Controller from "./Controller";

class DashboardController extends Controller {
  async index (req: Request, res: Response, next: NextFunction) {
    const user: User = this.currentUser(res)

    res.render('dashboard', { user });
  }
}

export default DashboardController
