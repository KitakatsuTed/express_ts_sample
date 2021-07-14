import express, {NextFunction, Request, Response} from 'express'
import OrganizationsController from "../controllers/organizationsController";
import asyncHandler from "../lib/asyncWrapper";

const router = express.Router();
const organizationsController = new OrganizationsController()

router.get("/new", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.newForm(req, res, next))])
router.post("/", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.create(req, res, next))])
router.get("/:organizationId", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.show(req, res, next))])
router.get("/:organizationId/edit", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.edit(req, res, next))])
router.put("/:organizationId", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.update(req, res, next))])
router.delete("/:organizationId", [organizationsController.authenticateUser, asyncHandler((req: Request, res: Response, next: NextFunction) => organizationsController.destroy(req, res, next))])

export default router
