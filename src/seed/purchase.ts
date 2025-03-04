import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function purchase() {
    await createDailyPurchases(2020);
    await createDailyPurchases(2021);
    await createDailyPurchases(2022);
    await createDailyPurchases(2023);
    await createDailyPurchases(2024);
    await createDailyPurchases(2025, new Date());
}

function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(value, max));
}

async function createDailyPurchases(year : number, endDate: Date | null = null) {
    function iterateDaysOfYear(year: number,endDate: Date | null = null, callback: (date: Date) => void) {
        if (endDate === null){
          endDate = new Date(year + 1, 0, 1);
        }
        const startDate = new Date(year, 0, 1);    
        for (let currentDate = startDate; currentDate < endDate; currentDate.setDate(currentDate.getDate() + 1)) {
          const dateCopy = new Date(currentDate);
          callback(dateCopy);
        }
      }
  iterateDaysOfYear(year,endDate, async (date) => {
    const purchaseId = uuidv4();
    let totalCost = 0;

    try {
      // Fetch all stock items
      const stockItems = await prisma.stockItem.findMany();
    
      //const yesterday = new Date(date.getDate() - 1);

      // Generate random stock items purchased
      const stockItemsPurchasedData = stockItems.map((stockItem) => {
        // const stockItemUsageYesterday = getStockUsage(yesterday.toDateString(),stockItem.sku);

        let q = clamp(Math.round(Math.random() * stockItem.popularityScore * 1000 / stockItem.purchasePrice), 0, 12); // Random quantity based on reorder quantity
        q = Math.floor((Math.random()) * q);
        const t = stockItem.purchasePrice * q;
        totalCost += t;
        return {
          stockSku: stockItem.sku,
          quantity: q,
          totalPrice: t,
        };
      });

      await prisma.purchase.create({
        data: {
          purchaseId: purchaseId,
          date: date,
          totalCost: totalCost,
          stockItemsPurchased: {
            create: stockItemsPurchasedData,
          },
        },
      });
    } catch (error) {
      console.error(`Error creating purchase for ${date.toISOString().split('T')[0]}:`, error);
    }
  });
}

export async function getStockUsage(date: string, stockSku: string) {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1); // Next day's midnight

  let stockUsage = 0;
  try {
    // Find sales on the given date
    const yesterdaySale = await prisma.sale.findFirst({
      where: {
        date: {
          gte: startDate,
          lt: endDate, // This ensures we get all sales from the exact date
        },
      }
    });

    if (yesterdaySale === null)
      return 0;

    const stockItemSold = await prisma.saleStockItem.findFirst({
      where: {
        saleId: yesterdaySale.saleId,
        stockSku: stockSku,
      }
    });

    if (stockItemSold === null) 
      return 0;
    
    stockUsage += stockItemSold.quantity;

    const menuItemsSold = await prisma.saleMenuItem.findFirst({
        where: {
            saleId: yesterdaySale.saleId,
            menuItem: {
                ingredients: {
                    some: {
                        stockSku: stockSku,
                    },
                },
            },
        }
    });

    if (menuItemsSold === null)
        return stockUsage;

    const ingredient = await prisma.menuItemIngredient.findFirst({
        where: {
            menuItemId: menuItemsSold.menuId,
            stockSku: stockSku,
        }
    });

    if (ingredient === null)
        return stockUsage;

    stockUsage += ingredient.quantityUsed * menuItemsSold.quantity;

    return stockUsage;


  } catch (error) {
    console.error('Error fetching stock usage:', error);
    return null;
  }
}