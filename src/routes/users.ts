import express from 'express'
import UsersController from '../controllers/usersController'

const router = express.Router();
const usersController = new UsersController()

// コントローラーのコールバックは第2引数に順番に配列に押し込めて良さげ感
router.get("/", [usersController.authenticateUser, usersController.index])
router.get("/:id", [usersController.authenticateUser, usersController.show])

export default router
