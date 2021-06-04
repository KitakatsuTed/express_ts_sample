import express from 'express'
import UsersController from '../controllers/usersController'

const router = express.Router();
const usersController = new UsersController()

router.get("/", usersController.index)
router.get("/new", usersController.newForm)
router.post("/create", usersController.create)

export default router
