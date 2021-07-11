import express, {NextFunction, Request, Response} from "express";
import asyncHandler from "../lib/asyncWrapper";
const router = express.Router();

router.get("/", asyncHandler((req: Request, res: Response, next: NextFunction) => {
  res.render('index');
}))

export default router
