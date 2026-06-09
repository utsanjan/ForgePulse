import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import dashboardRouter from "./dashboard";
import productionRouter from "./production";
import inventoryRouter from "./inventory";
import qualityRouter from "./quality";
import procurementRouter from "./procurement";
import workforceRouter from "./workforce";
import reportsRouter from "./reports";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/dashboard", dashboardRouter);
router.use("/production", productionRouter);
router.use("/inventory", inventoryRouter);
router.use("/quality", qualityRouter);
router.use("/procurement", procurementRouter);
router.use("/workforce", workforceRouter);
router.use("/reports", reportsRouter);

export default router;
