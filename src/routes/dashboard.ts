import express, {NextFunction, Request, Response} from 'express'
import DashboardController from "../controllers/dashboardController";
import asyncHandler from "../lib/asyncWrapper";

const router = express.Router();
const dashboardController = new DashboardController()

router.get("/", [dashboardController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => dashboardController.index(req, res, next))])

export default router
