import { PrismaClient } from "@prisma/client";
import { sortByDate } from "./utils";

const prisma = new PrismaClient();

export async function getTotalRevenueListPeriod(startDate: Date, endDate: Date) {
  
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gt: startDate,  // Greater than or equal to the start date
          lte: endDate,     // Less than the end date (exclusive)
        },
      },
      select: {
        date: true,
        totalRevenue: true,
      },
    });
  
    // Format the result as requested
    const totalRevenues = sales.map(sale => ({
      date: sale.date.toISOString().split("T")[0], // Format the date as 'MM/DD/YYYY'
      totalRevenue: sale.totalRevenue,
    }));
  
    return sortByDate(totalRevenues);
  }

export async function getTotalCostListPeriod(startDate: Date, endDate: Date) {
  
    const purchases = await prisma.purchase.findMany({
      where: {
        date: {
          gt: startDate,  // Greater than or equal to the start date
          lte: endDate,     // Less than the end date (exclusive)
        },
      },
      select: {
        date: true,
        totalCost: true,
      },
    });
  
    // Format the result as requested
    const totalCosts = purchases.map(purchase => ({
      date: purchase.date.toISOString().split("T")[0], // Format the date as 'MM/DD/YYYY'
      totalCost: purchase.totalCost,
    }));
  
    return sortByDate(totalCosts);
  }