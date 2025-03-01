import { PrismaClient } from "@prisma/client";

const total_sku = 87;
const prisma = new PrismaClient();

export async function getSalesQuantityListForMonth(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const result: { date: string; stockItemQuantity: number; menuItemQuantity: number }[] = [];

  for (let day = 1; day <= endDate.getDate(); day++) {
    const dayStart = new Date(year, month - 1, day);
    const dayEnd = new Date(year, month - 1, day, 23, 59, 59);

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

  return result;
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

export async function getTotalCostListInMonth(year: number, month: number) {
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
  
    // Format the result as requested
    const totalCosts = purchases.map(purchase => ({
      date: purchase.date.toLocaleDateString(), // Format the date as 'MM/DD/YYYY'
      totalCost: purchase.totalCost,
    }));
  
    return totalCosts;
  }

export async function getTotalRevenueListInMonth(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0); // End of the month (last day)
  
    const sales = await prisma.sale.findMany({
      where: {
        date: {
          gte: startDate,  // Greater than or equal to the start date
          lt: endDate,     // Less than the end date (exclusive)
        },
      },
      select: {
        date: true,
        totalRevenue: true,
      },
    });
  
    // Format the result as requested
    const totalRevenues = sales.map(sale => ({
      date: sale.date.toLocaleDateString(), // Format the date as 'MM/DD/YYYY'
      totalRevenue: sale.totalRevenue,
    }));
  
    return totalRevenues;
  }

export async function getBestSellingMenuItems(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0); // End of the month (last day)
  
    const topSellingMenuItems = await prisma.saleMenuItem.groupBy({
      by: ['menuId'],
      where: {
        sale: {
          date: {
            gte: startDate,  // Greater than or equal to the start date
            lt: endDate,     // Less than the end date (exclusive)
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


export async function getWorstSellingMenuItems(year: number, month: number) {
    const startDate = new Date(year, month - 1, 1); // Start of the month
    const endDate = new Date(year, month, 0); // End of the month (last day)
  
    const worstSellingMenuItems = await prisma.saleMenuItem.groupBy({
      by: ['menuId'],
      where: {
        sale: {
          date: {
            gte: startDate,  // Greater than or equal to the start date
            lt: endDate,     // Less than the end date (exclusive)
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

export async function getDailyQuantitySold(menuId: string, year: number, month: number) {
    // Start and end dates of the given month
    const startDate = new Date(year, month - 1, 1); // First day of the month
    const endDate = new Date(year, month, 0); // Last day of the month (exclusive)
  
    try {
      const sales = await prisma.saleMenuItem.findMany({
        where: {
          menuId: menuId, // Filter by the given item (menuId)
          sale: {
            date: {
              gte: startDate,  // Greater than or equal to the start date
              lt: endDate,     // Less than the end date (exclusive)
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
      const dailyQuantities = Array.from({ length: endDate.getDate() }, () => 0);
  
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
  
export async function getUniqueSKUs(year: number, month: number) {
    try {
        // Initialize an array to store the count of no_sale_item for each day
        const noSaleItemsPerDay: { date: string, no_sale_item: number }[] = [];
    
        // Fetch all the sales in the given month and year
        const sales = await prisma.saleStockItem.findMany({
          where: {
            sale: {
              date: {
                gte: new Date(year, month - 1, 1), // Start of the month
                lt: new Date(year, month, 1), // Start of the next month
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
                  gte: new Date(year, month - 1, 1), // Start of the month
                  lt: new Date(year, month, 1), // Start of the next month
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
        return uniqueSKUs;
    
      } catch (error) {
        console.error('Error fetching unique skus:', error);
        throw new Error('Error fetching unique_skus');
      }
}

