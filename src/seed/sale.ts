import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function sale(){
    await createDailySales(2020);
    await createDailySales(2021);
    await createDailySales(2022);
    await createDailySales(2023);
    await createDailySales(2024);
}

async function createDailySales(year: number) {
  function iterateDaysOfYear(year: number, callback: (date: Date) => void) {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    for (let currentDate = startDate; currentDate < endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      const dateCopy = new Date(currentDate);
      callback(dateCopy);
    }
  }

  iterateDaysOfYear(year, async (date) => {
    const saleId = uuidv4();
    let totalRevenue = 0;

    try {
      // Fetch all stock items and menu items to randomly select from
      const stockItems = await prisma.stockItem.findMany();
      const menuItems = await prisma.menuItem.findMany();

      // Generate random stock items sold
      const stockItemSoldData = stockItems.map((stockItem) => {
        const q = Math.floor(Math.random() * stockItem.popularityScore);
        const t = stockItem.sellingPrice * q;
        totalRevenue += t;
        return {
          stockSku: stockItem.sku,
          quantity: q,
          totalPrice: t,
        };
      });

      // Generate random menu items sold
      const menuItemSoldData = menuItems.map((menuItem) => {
        const q = Math.floor(Math.random() * menuItem.popularityScore);
        const t = menuItem.price * q;
        totalRevenue += t;
        return {
          menuId: menuItem.menuId,
          quantity: q,
          totalPrice: t,
        };
      });


      await prisma.sale.create({
        data: {
          saleId: saleId,
          date: date,
          totalRevenue: totalRevenue,
          stockItemsSold: {
            create: stockItemSoldData,
          },
          menuItemsSold: {
            create: menuItemSoldData,
          },
        },
      });
    } catch (error) {
      console.error(`Error creating sale for ${date.toISOString().split('T')[0]}:`, error);
    }
  });
}
