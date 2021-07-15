import express, {NextFunction, Request, Response} from 'express'
import OrganizationsController from "../controllers/organizationsController";
import asyncHandler from "../lib/asyncWrapper";

const router = express.Router();
const organizationsController = new OrganizationsController()

router.get("/organizations/new", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.newForm(req, res, next))])
router.post("/organizations/", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.create(req, res, next))])
router.get("/organizations/:organizationId", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.show(req, res, next))])
router.get("/organizations/:organizationId/edit", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.edit(req, res, next))])
router.put("/organizations/:organizationId", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.update(req, res, next))])
router.delete("/organizations/:organizationId", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.destroy(req, res, next))])

export default router
