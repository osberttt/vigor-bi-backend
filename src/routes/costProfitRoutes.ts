import { Router, Request, Response } from "express";
import { getTotalCostListPeriod, getTotalRevenueListPeriod } from "../repository/cost_profit";
const router = Router();

router.get("/cost-period", async (req: Request, res: Response) => {
  const startDate = req.query.start as string;
  const endDate = req.query.end as string;
  const data = await getTotalCostListPeriod(new Date(startDate), new Date(endDate));
  res.json({data});
});

router.get("/revenue-period", async (req: Request, res: Response) => {
  const startDate = req.query.start as string;
  const endDate = req.query.end as string;
  const data = await getTotalRevenueListPeriod(new Date(startDate), new Date(endDate));
    res.json({data});
  });

export default router;


