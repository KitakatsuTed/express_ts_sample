import express from 'express'
import UsersController from '../controllers/usersController'

const router = express.Router();
const usersController = new UsersController()

// ログイン要求のモジュールの良い共通化方法を考える
router.all("/*", function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    console.log('no login...')
    req.flash('danger', 'ログインしてください')
    res.redirect("/login");
  }
});

router.get("/", usersController.index)
router.get("/:id", usersController.show)

export default router
