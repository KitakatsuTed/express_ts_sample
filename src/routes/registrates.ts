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

router.get("/sign_up", (req: Request, res: Response) => registratesController.newForm(req, res))
router.post("/sign_up", (req: Request, res: Response) => registratesController.create(req, res))
router.get("/account/edit", (req: Request, res: Response) => registratesController.edit(req, res))
router.put("/account", (req: Request, res: Response) => registratesController.update(req, res))
router.delete("/account", (req: Request, res: Response) => registratesController.destroy(req, res))

export default router
