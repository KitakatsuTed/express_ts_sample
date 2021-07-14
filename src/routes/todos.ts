import {NextFunction, Request, Response} from 'express'
import TodosController from "../controllers/todosController";
import asyncHandler from "../lib/asyncWrapper";
import router from "./organizations"

const todosController = new TodosController()

// router.get("/todos/:todoId", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.show(req, res, next))])
router.post("/:organizationId/todos", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.create(req, res, next))])
router.get("/:organizationId/todos/:todoId/edit", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.edit(req, res, next))])
router.put("/:organizationId/todos/:todoId/status", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.status(req, res, next))])
router.put("/:organizationId/todos/:todoId", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.update(req, res, next))])
router.delete("/:organizationId/todos/:todoId", [todosController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => todosController.destroy(req, res, next))])

export default router
