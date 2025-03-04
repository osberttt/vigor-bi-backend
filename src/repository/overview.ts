import { PrismaClient } from "@prisma/client";
import { sortByDate } from "./utils";
import { getTotalCostInMonth } from "./trends";

const total_sku = 87;
const prisma = new PrismaClient();

export async function getSalesQuantityListForMonth(endDate: Date) {
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 30);

  const result: { date: string; stockItemQuantity: number; menuItemQuantity: number }[] = [];

  for (let day = 1; day <= 30; day++) {
    const dayStart = new Date(startDate);
    dayStart.setDate(startDate.getDate() + day);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59);

    const stockItems = await prisma.saleStockItem.aggregate({
      where: {
        sale: {
          date: {
            gte: dayStart,
            lte: dayEnd,
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
            gte: dayStart,
            lte: dayEnd,
          },
        },
      },
      _sum: {
        quantity: true,
      },
    });

    result.push({
      date: dayStart.toISOString().split("T")[0],
      stockItemQuantity: stockItems._sum.quantity || 0,
      menuItemQuantity: menuItems._sum.quantity || 0,
    });
  }
  return sortByDate(result);
}

export async function getTotalMenuRevenue(endDate: Date) {
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
    const saleStockItems = await prisma.saleMenuItem.findMany({
      where: {
        sale: {
          date: {
            gt: startDate,
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


export async function getTotalStockRevenue(endDate: Date) {
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
    const saleStockItems = await prisma.saleStockItem.findMany({
      where: {
        sale: {
          date: {
            gt: startDate,
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

export async function getTotalCostListInMonth(endDate: Date) {
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
  
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
      date: purchase.date.toISOString().split("T")[0], 
      totalCost: purchase.totalCost,
    }));
  
    return sortByDate(totalCosts);
  }

export async function getTotalRevenueListInMonth(endDate: Date) {
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
  
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
      date: sale.date.toISOString().split("T")[0], 
      totalRevenue: sale.totalRevenue,
    }));
  
    return sortByDate(totalRevenues);
  }

export async function getBestSellingMenuItems(endDate: Date) {
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
  
    const topSellingMenuItems = await prisma.saleMenuItem.groupBy({
      by: ['menuId'],
      where: {
        sale: {
          date: {
            gt: startDate,  // Greater than or equal to the start date
            lte: endDate,     // Less than the end date (exclusive)
          },
        },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'desc',
        },
      },
      take: 5, // Limit to top 5 selling items
    });
  
    // Retrieve additional menu item details
    const menuItems = await Promise.all(
      topSellingMenuItems.map(async (item) => {
        const menuItem = await prisma.menuItem.findUnique({
          where: { menuId: item.menuId },
        });
        return { ...menuItem, totalQuantitySold: item._sum.quantity };
      })
    );
  
    return menuItems;
  }


export async function getWorstSellingMenuItems(endDate: Date) {
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
  
    const worstSellingMenuItems = await prisma.saleMenuItem.groupBy({
      by: ['menuId'],
      where: {
        sale: {
          date: {
            gt: startDate,  // Greater than or equal to the start date
            lte: endDate,     // Less than the end date (exclusive)
          },
        },
      },
      _sum: {
        quantity: true,
      },
      orderBy: {
        _sum: {
          quantity: 'asc',
        },
      },
      take: 5, // Limit to top 5 selling items
    });
  
    // Retrieve additional menu item details
    const menuItems = await Promise.all(
      worstSellingMenuItems.map(async (item) => {
        const menuItem = await prisma.menuItem.findUnique({
          where: { menuId: item.menuId },
        });
        return { ...menuItem, totalQuantitySold: item._sum.quantity };
      })
    );
  
    return menuItems;
  }

export async function getDailyQuantitySold(menuId: string, endDate: Date) {
    // Start and end dates of the given month
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
  
    try {
      const sales = await prisma.saleMenuItem.findMany({
        where: {
          menuId: menuId, // Filter by the given item (menuId)
          sale: {
            date: {
              gt: startDate,  // Greater than or equal to the start date
              lte: endDate,     // Less than the end date (exclusive)
            },
          },
        },
        select: {
          quantity: true, // The quantity sold
          sale: {
            select: {
              date: true, // The date of the sale
            },
          },
        },
      });
  
      // Create a list of daily quantities sold (initialize as 0 for every day of the month)
      const dailyQuantities = Array.from({ length: 30 }, () => 0);
      // sort by date
      sales.sort((a, b) => a.sale.date.getTime() - b.sale.date.getTime());
      // Aggregate the sales by day
      sales.forEach(sale => {
        const saleDate = sale.sale.date.getDate(); // Get the day of the sale (1 to 31)
        dailyQuantities[saleDate - 1] += sale.quantity; // Add the quantity sold on that day
      });
  
      return dailyQuantities;
    } catch (error) {
      console.error("Error fetching daily quantity sold:", error);
      return [];
    }
  }
  
export async function getUniqueSKUs(endDate: Date) {
    const startDate = new Date(endDate);
    startDate.setDate(endDate.getDate() - 30);
    try {
        // Initialize an array to store the count of no_sale_item for each day
        const noSaleItemsPerDay: { date: string, no_sale_item: number }[] = [];
    
        // Fetch all the sales in the given month and year
        const sales = await prisma.saleStockItem.findMany({
          where: {
            sale: {
              date: {
                gt: startDate,
                lte: endDate
              },
            },
          },
          include: {
            sale: true, // Include sale data to access sale.date
          },
        });
    
        // Iterate through each sale and check for no_sale_item
        sales.forEach((sale) => {
          const saleDate = sale.sale.date.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
    
          // If the quantity of stock sold is 0, count it as a no_sale_item
          if (sale.quantity === 0) {
            let found = noSaleItemsPerDay.find((item) => item.date === saleDate);
            if (found) {
              found.no_sale_item += 1;
            } else {
              noSaleItemsPerDay.push({ date: saleDate, no_sale_item: 1 });
            }
          }
        });

        const menu_sales = await prisma.saleStockItem.findMany({
            where: {
              sale: {
                date: {
                  gt: startDate,
                  lte: endDate
                },
              },
            },
            include: {
              sale: true, // Include sale data to access sale.date
            },
          });
      
          // Iterate through each sale and check for no_sale_item
          menu_sales.forEach((sale) => {
            const saleDate = sale.sale.date.toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
      
            // If the quantity of stock sold is 0, count it as a no_sale_item
            if (sale.quantity === 0) {
              let found = noSaleItemsPerDay.find((item) => item.date === saleDate);
              if (found) {
                found.no_sale_item += 1;
              } else {
                noSaleItemsPerDay.push({ date: saleDate, no_sale_item: 1 });
              }
            }
          });
    
        const uniqueSKUs: { date: string, skus: number }[] = [];
        for (let i = 0; i < noSaleItemsPerDay.length; i++) {
            uniqueSKUs.push({ date: noSaleItemsPerDay[i].date, skus: total_sku - noSaleItemsPerDay[i].no_sale_item });
        }
        return sortByDate(uniqueSKUs);
    
      } catch (error) {
        console.error('Error fetching unique skus:', error);
        throw new Error('Error fetching unique_skus');
      }
}


export async function getLastMonthData(endDate: Date){
  endDate.setDate(endDate.getDate() - 30);

  const cost = await getTotalCostValueInPeriod(endDate);
  const revenue = await getTotalMenuRevenue(endDate) + await getTotalStockRevenue(endDate);
  const quantity = (await getSalesQuantityInPeriod(endDate)).menuItemQuantity + (await getSalesQuantityInPeriod(endDate)).stockItemQuantity;
  const profit = revenue - cost;

  return {cost,revenue,quantity,profit};
}

export async function getTotalCostValueInPeriod(endDate: Date) {
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 30);

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

export async function getSalesQuantityInPeriod(endDate: Date) {
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 30);

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