import express, {NextFunction, Request, Response} from 'express'
import TodosController from "../controllers/todosController";
import asyncHandler from "../lib/asyncWrapper";
const router = express.Router();

const todosController = new TodosController()

// router.get("/todos/:todoId", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.show(req, res, next))])
router.post("/organizations/:organizationId/todos", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.create(req, res, next))])
router.get("/organizations/:organizationId/todos/:todoId/edit", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.edit(req, res, next))])
router.put("/organizations/:organizationId/todos/:todoId/status", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.status(req, res, next))])
router.put("/organizations/:organizationId/todos/:todoId", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.update(req, res, next))])
router.delete("/organizations/:organizationId/todos/:todoId", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.destroy(req, res, next))])

export default router
