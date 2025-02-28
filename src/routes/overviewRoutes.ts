import { Router, Request, Response } from "express";
import { getSalesQuantityListForMonth, getTotalMenuRevenue, getTotalStockRevenue, getTotalCostListInMonth, getTotalRevenueListInMonth, getBestSellingMenuItems, getWorstSellingMenuItems, getDailyQuantitySold, getUniqueSKUs} from "../repository/overview";

const router = Router();

router.get("/sale-quantity-graph", async (req: Request, res: Response) => {
  const data = await getSalesQuantityListForMonth(2024, 12);
  res.json({data});
});

router.get("/revenue-graph", async (req: Request, res: Response) => {
  const menuRevenue = await getTotalMenuRevenue(2024, 12);  
  const stockRevenue = await getTotalStockRevenue(2024, 12);
  res.json({menuRevenue, stockRevenue});
}); 

router.get("/total-cost-kpi", async (req: Request, res: Response) => {
  const data = await getTotalCostListInMonth(2024, 12);
  res.json({data});
}); 

router.get("/total-revenue-kpi", async (req: Request, res: Response) => {
  const data = await getTotalRevenueListInMonth(2024, 12);
  res.json({data});
}); 

router.get("/best-selling-items", async (req: Request, res: Response) => {
  const data = await getBestSellingMenuItems(2024, 12);
  res.json({data});
});

router.get("/worst-selling-items", async (req: Request, res: Response) => {
  const data = await getWorstSellingMenuItems(2024, 12);
  res.json({data});
});

router.get("/get-daily-sales", async (req: Request, res: Response) => {
  const menuId = req.query.menuId as string;
  const data = await getDailyQuantitySold(menuId, 2024, 12);
  res.json({data});
});

router.get("/unique-skus", async (req: Request, res: Response) => {
  const data = await getUniqueSKUs(2024, 12);
  res.json({data});
});

export default router;


