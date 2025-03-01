import { Router, Request, Response } from "express";
import { getTotalRevenueMOM, getTotalCostMOM, getSalesQuantityMOM, getTotalRevenueYoY, getTotalCostYoY, getSalesQuantityYoY } from "../repository/trends";
const router = Router();

router.get("/revenue-mom", async (req: Request, res: Response) => {
  const data = await getTotalRevenueMOM(2024);
  res.json({data});
});

router.get("/cost-mom", async (req: Request, res: Response) => {
  const data = await getTotalCostMOM(2024);
  res.json({data});
});

router.get("/quantity-mom", async (req: Request, res: Response) => {
  const data = await getSalesQuantityMOM(2024);
  res.json({data});
});

router.get("/revenue-yoy", async (req: Request, res: Response) => {
  const data = await getTotalRevenueYoY(2020, 2024);
  res.json({data});
});

router.get("/cost-yoy", async (req: Request, res: Response) => {
  const data = await getTotalCostYoY(2020, 2024);
  res.json({data});
});

router.get("/quantity-yoy", async (req: Request, res: Response) => {
  const data = await getSalesQuantityYoY(2020, 2024);
  res.json({data});
});

export default router;


