import {Request, Response} from "express";
import User from "../models/user";
import db from "../models";

class UsersController {
  async index (req: Request, res: Response) {
    const users: User[] = await db.User.findAll()

    res.render('users/index', { users });
  }

  async show (req: Request, res: Response) {
    const user: User = req.user as User

    res.render('users/show', { user })
  }
}

export default UsersController
