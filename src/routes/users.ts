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
    req.flash('alert', 'ログインしてください')
    res.redirect("/login");
  }
});

router.get("/", usersController.index)
router.get("/new", usersController.newForm)
router.post("/", usersController.create)
router.get("/:id", usersController.show)
router.get("/:id/edit", usersController.edit)
router.put("/:id", usersController.update)
router.delete("/:id", usersController.destroy)

export default router
