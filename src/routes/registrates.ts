import express, {Request, Response, NextFunction} from 'express'
import RegistratesController from '../controllers/registratesController'
const router = express.Router();
const registratesController = new RegistratesController()
import asyncHandler from "./asyncWrapper";

// ログイン要求のモジュールの良い共通化方法を考える
router.all("/account*", (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log('no login...')
    req.flash('danger', 'ログインしてください')
    res.redirect("/login");
  }
});

router.get("/sign_up", asyncHandler((req: Request, res: Response, next: NextFunction) => registratesController.newForm(req, res, next)))
router.post("/sign_up", asyncHandler((req: Request, res: Response, next: NextFunction) => registratesController.create(req, res, next)))
router.get("/account/edit", asyncHandler((req: Request, res: Response, next: NextFunction) => registratesController.edit(req, res, next)))
router.put("/account", asyncHandler((req: Request, res: Response, next: NextFunction) => registratesController.update(req, res, next)))
router.delete("/account", asyncHandler((req: Request, res: Response, next: NextFunction) => registratesController.destroy(req, res, next)))

export default router
