import express, {NextFunction, Request, Response} from 'express'
import asyncHandler from "../lib/asyncWrapper";
import OrganizationUsersController from "../controllers/organizationUsersController";
import authenticateOrganization from "../lib/authenticateOrganization";

const router = express.Router();
const organizationUsersController = new OrganizationUsersController()

router.get("/organizations/:organizationId/organization_users/accept", [
  authenticateOrganization,
  organizationUsersController.authenticateUser,
  asyncHandler((req: Request, res: Response, next: NextFunction) => organizationUsersController.update(req, res, next))
])

export default router
