import {Request, Response} from "express";

class UsersController {

  index (req: Request, res: Response) {
    res.render('users/index');
  }

  newForm (req: Request, res: Response) {
    res.render('users/new');
  }

  create (req: Request, res: Response) {
  }
}

export default UsersController