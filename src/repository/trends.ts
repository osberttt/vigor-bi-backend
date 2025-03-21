import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getTotalCostInMonth(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1); // Start of the month
  const endDate = new Date(year, month, 0); // End of the month (last day)

  const purchases = await prisma.purchase.findMany({
    where: {
      date: {
        gte: startDate,  // Greater than or equal to the start date
        lt: endDate,     // Less than the end date (exclusive)
      },
    },
    select: {
      date: true,
      totalCost: true,
    },
  });
   // Calculate the total sum of quantity * totalPrice
   const totalCost = purchases.reduce((sum, item) => {
    return sum + item.totalCost;
  }, 0);

  return totalCost;
}

export async function getTotalRevenueMOM(year: number){
    const menu_revenues_mom = [];
    for (let month = 1; month <= 12; month++){
      const revenue = await getTotalMenuRevenue(year, month);
      menu_revenues_mom.push(revenue);
    }

    const stock_revenues_mom = []
    for (let month = 1; month <= 12; month++){
        const revenue = await getTotalStockRevenue(year, month);
        stock_revenues_mom.push(revenue);
    }
    const revenues_mom = {menu_revenues_mom,stock_revenues_mom}
    return revenues_mom;
  }

export async function getTotalCostMOM(year: number){
    const costs_mom = [];
    for (let month = 1; month <= 12; month++){
      const revenue = await getTotalCostInMonth(year, month);
      costs_mom.push(revenue);
    }
    return costs_mom;
  }

export async function getSalesQuantityMOM(year:number){
  const monthlyData: { stock_quantities_mom: number[]; menu_quantities_mom: number[] } = {
    stock_quantities_mom: [],
    menu_quantities_mom: [],
  };

  for (let month = 1; month <= 12; month++) {
    const sales = await getSalesQuantityInMonth(year, month);
    monthlyData.stock_quantities_mom.push(sales.stockItemQuantity);
    monthlyData.menu_quantities_mom.push(sales.menuItemQuantity);
  }

  return monthlyData;
}

export async function getTotalRevenueYoY(startYear:number, endYear:number){
  const yearlyData: { stock_revenues_yoy: number[]; menu_revenues_yoy: number[] } = {
    stock_revenues_yoy: [],
    menu_revenues_yoy: []
  };

  for (let year = startYear; year <= endYear; year++) {
    const revenues = await getTotalRevenueMOM(year);
    
    const totalStockRevenue = revenues.stock_revenues_mom.reduce((acc, val) => acc + val, 0);
    const totalMenuRevenue = revenues.menu_revenues_mom.reduce((acc, val) => acc + val, 0);

    yearlyData.stock_revenues_yoy.push(totalStockRevenue);
    yearlyData.menu_revenues_yoy.push(totalMenuRevenue);
  }

  return yearlyData;
}

export async function getTotalCostYoY(startYear:number, endYear:number){
  const costs_yoy = []
  for (let year = startYear; year <= endYear; year++) {
    const costs = await getTotalCostMOM(year);
    
    const totalCost = costs.reduce((acc, val) => acc + val, 0);

    costs_yoy.push(totalCost);
  }
  return costs_yoy;
}

export async function getSalesQuantityYoY(startYear:number, endYear:number){
  const yearlyData:{stock_quantities_yoy:number[], menu_quantities_yoy:number[]} = {
    stock_quantities_yoy: [],
    menu_quantities_yoy: []
  };

  for (let year = startYear; year <= endYear; year++) {
    const quantities = await getSalesQuantityMOM(year);
    
    const totalStockQuantity = quantities.stock_quantities_mom.reduce((acc, val) => acc + val, 0);
    const totalMenuQuantity = quantities.menu_quantities_mom.reduce((acc, val) => acc + val, 0);

    yearlyData.stock_quantities_yoy.push(totalStockQuantity);
    yearlyData.menu_quantities_yoy.push(totalMenuQuantity);
  }

  return yearlyData;
}

export async function getTotalMenuRevenue(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const saleStockItems = await prisma.saleMenuItem.findMany({
      where: {
        sale: {
          date: {
            gte: startDate,
            lte: endDate,
          }
        },
      },
      select: {
        quantity: true,
        totalPrice: true,
      },
    });
  
    // Calculate the total sum of quantity * totalPrice
    const totalSum = saleStockItems.reduce((sum, item) => {
      return sum + item.totalPrice;
    }, 0);
  
    return totalSum;
  }


export async function getTotalStockRevenue(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);
    const saleStockItems = await prisma.saleStockItem.findMany({
      where: {
        sale: {
          date: {
            gte: startDate,
            lte: endDate,
          }
        },
      },
      select: {
        quantity: true,
        totalPrice: true,
      },
    });
  
    // Calculate the total sum of quantity * totalPrice
    const totalSum = saleStockItems.reduce((sum, item) => {
      return sum + item.totalPrice;
    }, 0);
  
    return totalSum;
  }

export async function getSalesQuantityInMonth(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const result: { stockItemQuantity: number; menuItemQuantity: number } = {stockItemQuantity: 0, menuItemQuantity: 0};
  const stockItems = await prisma.saleStockItem.aggregate({
    where: {
      sale: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
    _sum: {
      quantity: true,
    },
  });

  const menuItems = await prisma.saleMenuItem.aggregate({
    where: {
      sale: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    },
    _sum: {
      quantity: true,
    },
  });

    result.stockItemQuantity += stockItems._sum.quantity || 0;
    result.menuItemQuantity += menuItems._sum.quantity || 0;
  return result;
}