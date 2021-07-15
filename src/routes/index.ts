import express from "express";
const router = express.Router();

import routRouter from './root';
import usersRouter from './users';
import organizationRouter from './organizations';
import todoRouter from './todos';
import dashboardRouter from './dashboard';
import authRouter from './auth';
import registrationRouter from './registration';

router.use(usersRouter);
router.use(todoRouter);
router.use(organizationRouter);
router.use(dashboardRouter);
router.use(registrationRouter);
router.use(authRouter);
router.use(routRouter);

export default router
