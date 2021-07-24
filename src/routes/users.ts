import express, {NextFunction, Request, Response} from 'express'
import UsersController from '../controllers/usersController'
import asyncHandler from "../lib/asyncWrapper";

const router = express.Router();
const usersController = new UsersController()

// コントローラーのコールバックは第2引数に順番に配列に押し込めて良さげ感
// TODO もしかしたら： usersController.authenticateUser は router.get("/" xxx) next()でauthチェックしてもアリかも
// そうしたらhandlerを配列にしなくてもう少しすっきりする？
router.get("/users/", [usersController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => usersController.index(req, res, next))])
router.get("/users/:id", [usersController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => usersController.show(req, res, next))])

export default router
