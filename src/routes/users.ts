import express, {Request, Response} from 'express'
import UsersController from '../controllers/usersController'

const router = express.Router();
const usersController = new UsersController()

// コントローラーのコールバックは第2引数に順番に配列に押し込めて良さげ感
router.get("/", [usersController.authenticateUser, (req: Request, res: Response) => usersController.index(req, res)])
router.get("/:id", [usersController.authenticateUser, (req: Request, res: Response) => usersController.show(req, res)])

export default router
