import { Router, Request, Response } from "express";
import { getStockItems } from "../repository/stock";
const router = Router();

router.get("/table", async (req: Request, res: Response) => {
  const data = await getStockItems();
  res.json({data});
});


export default router;


