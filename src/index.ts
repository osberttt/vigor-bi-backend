import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import overviewRoutes from "./routes/overviewRoutes";
import trendsRoutes from "./routes/trendRoutes";
import costProfitRoutes from "./routes/costProfitRoutes";
import stockRoutes from "./routes/stockRoutes";
import aiRoutes from "./routes/aiRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/overview", overviewRoutes);
app.use("/api/trends", trendsRoutes);
app.use("/api/cost-profit",costProfitRoutes)
app.use("/api/stock-management",stockRoutes)
app.use("/api/ai-insights",aiRoutes)

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript!");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
