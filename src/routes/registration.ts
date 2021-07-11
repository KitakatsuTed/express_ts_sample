import express, {Request, Response, NextFunction} from 'express'
import RegistratesController from '../controllers/registrationController'
const router = express.Router();
const registrationController = new RegistratesController()
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

router.get("/sign_up", asyncHandler((req: Request, res: Response, next: NextFunction) => registrationController.newForm(req, res, next)))
router.post("/sign_up", asyncHandler((req: Request, res: Response, next: NextFunction) => registrationController.create(req, res, next)))
router.get("/account/edit", asyncHandler((req: Request, res: Response, next: NextFunction) => registrationController.edit(req, res, next)))
router.put("/account", asyncHandler((req: Request, res: Response, next: NextFunction) => registrationController.update(req, res, next)))
router.delete("/account", asyncHandler((req: Request, res: Response, next: NextFunction) => registrationController.destroy(req, res, next)))

export default router
