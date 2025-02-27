import { PrismaClient, Sale, SaleStockItem, SaleMenuItem, StockItem, MenuItem, StockCategory } from '@prisma/client';

const prisma = new PrismaClient();

// Function to retrieve sales by date range (start date and end date)
export async function getSalesByDateRange(startDate: Date, endDate: Date): Promise<Sale[]> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
    return sales;
  } catch (error) {
    console.error('Error retrieving sales by date range:', error);
    throw error;
  }
}

// Function to retrieve sales by a single day
export async function getSalesBySingleDay(date: Date): Promise<Sale[]> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: date,
      },
    });
    return sales;
  } catch (error) {
    console.error('Error retrieving sales by single day:', error);
    throw error;
  }
}

// Function to retrieve sales by month and year
export async function getSalesByMonthYear(month: number, year: number): Promise<Sale[]> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
    });
    return sales;
  } catch (error) {
    console.error('Error retrieving sales by month and year:', error);
    throw error;
  }
}

// Function to retrieve sales by year
export async function getSalesByYear(year: number): Promise<Sale[]> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: new Date(year, 0, 1),
          lt: new Date(year + 1, 0, 1),
        },
      },
    });
    return sales;
  } catch (error) {
    console.error('Error retrieving sales by year:', error);
    throw error;
  }
}

// Function to retrieve total SKU sold in a specific month and year
export async function getTotalSkuSoldInMonthYear(month: number, year: number): Promise<number> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      include: {
        stockItemsSold: true,
      },
    });

    const totalSkuSold = sales.reduce((total, sale) => {
      return total + sale.stockItemsSold.reduce((sum, saleStockItem) => sum + saleStockItem.quantity, 0);
    }, 0);

    return totalSkuSold;
  } catch (error) {
    console.error('Error retrieving total SKU sold in month and year:', error);
    throw error;
  }
}

// Function to retrieve total sales amount in a specific month and year
export async function getTotalSalesAmountInMonthYear(month: number, year: number): Promise<number> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      include: {
        stockItemsSold: true,
        menuItemsSold: true,
      },
    });

    const totalSalesAmount = sales.reduce((total, sale) => {
      const stockItemsAmount = sale.stockItemsSold.reduce((sum, saleStockItem) => sum + saleStockItem.totalPrice, 0);
      const menuItemsAmount = sale.menuItemsSold.reduce((sum, saleMenuItem) => sum + saleMenuItem.totalPrice, 0);
      return total + stockItemsAmount + menuItemsAmount;
    }, 0);

    return totalSalesAmount;
  } catch (error) {
    console.error('Error retrieving total sales amount in month and year:', error);
    throw error;
  }
}

// Function to retrieve total sales quantity in a specific month and year
export async function getTotalSalesQuantityInMonthYear(month: number, year: number): Promise<number> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      include: {
        stockItemsSold: true,
        menuItemsSold: true,
      },
    });

    const totalSalesQuantity = sales.reduce((total, sale) => {
      const stockItemsQuantity = sale.stockItemsSold.reduce((sum, saleStockItem) => sum + saleStockItem.quantity, 0);
      const menuItemsQuantity = sale.menuItemsSold.reduce((sum, saleMenuItem) => sum + saleMenuItem.quantity, 0);
      return total + stockItemsQuantity + menuItemsQuantity;
    }, 0);

    return totalSalesQuantity;
  } catch (error) {
    console.error('Error retrieving total sales quantity in month and year:', error);
    throw error;
  }
}

// Function to retrieve total SKU sold in a specific category for a given month and year
export async function getTotalSkuSoldStockInCategoryInMonthYear(category: StockCategory, month: number, year: number): Promise<number> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      include: {
        stockItemsSold: {
          where: {
            stockItem: {
              category: category,
            },
          },
        },
      },
    });

    const totalSkuSold = sales.reduce((total, sale) => {
      return total + sale.stockItemsSold.reduce((sum, saleStockItem) => sum + saleStockItem.quantity, 0);
    }, 0);

    return totalSkuSold;
  } catch (error) {
    console.error('Error retrieving total SKU sold in category in month and year:', error);
    throw error;
  }
}

// Function to retrieve total sales amount in a specific category for a given month and year
export async function getTotalSalesAmountStockInCategoryInMonthYear(category: StockCategory, month: number, year: number): Promise<number> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      include: {
        stockItemsSold: {
          where: {
            stockItem: {
              category: category,
            },
          },
        }
      },
    });

    const totalSalesAmount = sales.reduce((total, sale) => {
      const stockItemsAmount = sale.stockItemsSold.reduce((sum, saleStockItem) => sum + saleStockItem.totalPrice, 0);
      return total + stockItemsAmount;
    }, 0);

    return totalSalesAmount;
  } catch (error) {
    console.error('Error retrieving total sales amount in category in month and year:', error);
    throw error;
  }
}

// Function to retrieve total sales quantity in a specific category for a given month and year
export async function getTotalSalesQuantityStockInCategoryInMonthYear(category: StockCategory, month: number, year: number): Promise<number> {
  try {
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        },
      },
      include: {
        stockItemsSold: {
          where: {
            stockItem: {
              category: category,
            },
          },
        }
      },
    });

    const totalSalesQuantity = sales.reduce((total, sale) => {
      const stockItemsQuantity = sale.stockItemsSold.reduce((sum, saleStockItem) => sum + saleStockItem.quantity, 0);
      return total + stockItemsQuantity;
    }, 0);

    return totalSalesQuantity;
  } catch (error) {
    console.error('Error retrieving total sales quantity in category in month and year:', error);
    throw error;
  }
}
