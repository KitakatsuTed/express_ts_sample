import {NextFunction, Request, Response} from "express";
import User from "../models/user";
import db from "../models";
import Controller from "./Controller";

class UsersController extends Controller {
  async index (req: Request, res: Response, next: NextFunction) {
    const users: User[] = await db.User.findAll()

    res.render('users/index', { users });
  }

  async show (req: Request, res: Response, next: NextFunction) {
    const user: User = req.user as User

    res.render('users/show', { user })
  }
}

export default UsersController
