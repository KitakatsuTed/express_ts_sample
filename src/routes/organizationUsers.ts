import express, {NextFunction, Request, Response} from 'express'
import asyncHandler from "../lib/asyncWrapper";
import OrganizationUsersController from "../controllers/manager/organizationUsersController";

const router = express.Router();
const organizationUsersController = new OrganizationUsersController()

router.get("/organizations/:organizationId/organization_users/new", [organizationUsersController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationUsersController.newForm(req, res, next))])
router.post("/organizations/:organizationId/organization_users", [organizationUsersController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationUsersController.create(req, res, next))])
router.get("/organizations/:organizationId/organization_users/:organizationUserId", [organizationUsersController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationUsersController.show(req, res, next))])
router.get("/organizations/:organizationId/organization_users/:organizationUserId/edit", [organizationUsersController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationUsersController.edit(req, res, next))])
router.put("/organizations/:organizationId/organization_users/:organizationUserId", [organizationUsersController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationUsersController.update(req, res, next))])
router.delete("/organizations/:organizationId/organization_users/:organizationUserId", [organizationUsersController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationUsersController.destroy(req, res, next))])

export default router
