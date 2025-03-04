import { Router, Request, Response } from "express";
import {GoogleGenerativeAI} from "@google/generative-ai";
import dotenv from "dotenv";
import { getLastMonthData, getTotalStockRevenue, getTotalMenuRevenue, getTotalCostValueInPeriod, getSalesQuantityInPeriod} from "../repository/overview";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const router = Router();

router.get("/insight", async (req: Request, res: Response) => {
    try{
        // prompting
        const date = new Date();
        const lastMonthData = await getLastMonthData(date);
        const menuRevenue = await getTotalMenuRevenue(date);
        const stockRevenue = await getTotalStockRevenue(date);
        const cost = await getTotalCostValueInPeriod(date);
        const quantity = await getSalesQuantityInPeriod(date);
        const prompt_json = JSON.stringify({lastMonthData, menuRevenue, stockRevenue, cost, quantity});
        const prompt = "Give me insights for a cafe inventory.\n" + prompt_json;

        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        res.json({data:result.response.text()});
    } catch(error){
        console.log(error);
    }
});


export default router;


