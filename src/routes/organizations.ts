import express, {Request, Response} from 'express'
import OrganizationsController from "../controllers/organizationsController";

const router = express.Router();
const organizationsController = new OrganizationsController()

router.get("/new", [organizationsController.authenticateUser, (req: Request, res: Response) => organizationsController.newForm(req, res)])
router.post("/", [organizationsController.authenticateUser, (req: Request, res: Response) => organizationsController.create(req, res)])
router.get("/:id", [organizationsController.authenticateUser, (req: Request, res: Response) => organizationsController.show(req, res)])
router.get("/:id/edit", [organizationsController.authenticateUser, (req: Request, res: Response) => organizationsController.edit(req, res)])
router.patch("/:id", [organizationsController.authenticateUser, (req: Request, res: Response) => organizationsController.update(req, res)])
router.delete("/:id", [organizationsController.authenticateUser, (req: Request, res: Response) => organizationsController.destroy(req, res)])

export default router
