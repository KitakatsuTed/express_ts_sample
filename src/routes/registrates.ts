import express, {Request, Response, NextFunction} from 'express'
import RegistratesController from '../controllers/registratesController'
const router = express.Router();
const registratesController = new RegistratesController()

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

router.get("/sign_up", registratesController.newForm)
router.post("/sign_up", registratesController.create)
router.get("/account/edit", registratesController.edit)
router.put("/account", registratesController.update)
router.delete("/account", registratesController.destroy)

export default router
