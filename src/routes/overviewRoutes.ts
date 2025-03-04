import { Router, Request, Response } from "express";
import { getSalesQuantityListForMonth, getTotalMenuRevenue, getTotalStockRevenue, getTotalCostListInMonth, getTotalRevenueListInMonth, getBestSellingMenuItems, getWorstSellingMenuItems, getDailyQuantitySold, getUniqueSKUs, getLastMonthData} from "../repository/overview";

const router = Router();

router.get("/sale-quantity-graph", async (req: Request, res: Response) => {
  const dateString = req.query.end as string;
  const endDate = new Date(dateString);
  const data = await getSalesQuantityListForMonth(endDate);
  res.json({data});
});

router.get("/revenue-graph", async (req: Request, res: Response) => {
  const dateString = req.query.end as string;
  const endDate = new Date(dateString);
  const menuRevenue = await getTotalMenuRevenue(endDate);  
  const stockRevenue = await getTotalStockRevenue(endDate);
  res.json({menuRevenue, stockRevenue});
}); 

router.get("/total-cost-kpi", async (req: Request, res: Response) => {
  const dateString = req.query.end as string;
  const endDate = new Date(dateString);
  const data = await getTotalCostListInMonth(endDate);
  res.json({data});
}); 

router.get("/total-revenue-kpi", async (req: Request, res: Response) => {
  const dateString = req.query.end as string;
  const endDate = new Date(dateString);
  const data = await getTotalRevenueListInMonth(endDate);
  res.json({data});
}); 

router.get("/best-selling-items", async (req: Request, res: Response) => {
  const dateString = req.query.end as string;
  const endDate = new Date(dateString);
  const data = await getBestSellingMenuItems(endDate);
  res.json({data});
});

router.get("/worst-selling-items", async (req: Request, res: Response) => {
  const dateString = req.query.end as string;
  const endDate = new Date(dateString);
  const data = await getWorstSellingMenuItems(endDate);
  res.json({data});
});

router.get("/get-daily-sales", async (req: Request, res: Response) => {
  const dateString = req.query.end as string;
  const endDate = new Date(dateString);
  const menuId = req.query.menuId as string;
  const data = await getDailyQuantitySold(menuId, endDate);
  res.json({data});
});

router.get("/unique-skus", async (req: Request, res: Response) => {
  const dateString = req.query.end as string;
  const endDate = new Date(dateString);
  const data = await getUniqueSKUs(endDate);
  res.json({data});
});

router.get("/last-month-data", async (req: Request, res: Response) => {
  const dateString = req.query.end as string;
  const endDate = new Date(dateString);
  const data = await  getLastMonthData(endDate);
  res.json({data});
});

export default router;


