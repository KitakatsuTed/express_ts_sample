import express, {NextFunction, Request, Response} from "express";
import asyncHandler from "../lib/asyncWrapper";
import RootController from "../controllers/rootController";
const router = express.Router();

const rootController = new RootController()

router.get("/", asyncHandler((req: Request, res: Response, next: NextFunction) => rootController.index(req, res, next)))

export default router
