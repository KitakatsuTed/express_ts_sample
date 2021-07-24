import Controller from "./Controller";
import {NextFunction, Request, Response} from "express";

export default class RootController extends Controller {
  async index (req: Request, res: Response, next: NextFunction) {
    res.render('root/index', { layout: 'layouts/rootLayout.ejs' });
  }
}
