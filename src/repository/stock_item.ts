import { PrismaClient, StockCategory, StockItem } from '@prisma/client';

const prisma = new PrismaClient();

// Function to retrieve all stock items
export async function getAllStockItems(): Promise<StockItem[]> {
  try {
    const stockItems = await prisma.stockItem.findMany();
    return stockItems;
  } catch (error) {
    console.error('Error retrieving stock items:', error);
    throw error;
  }
}

// Function to retrieve a stock item by SKU
export async function getStockItemBySku(sku: string): Promise<StockItem | null> {
  try {
    const stockItem = await prisma.stockItem.findUnique({
      where: { sku: sku },
    });
    return stockItem;
  } catch (error) {
    console.error('Error retrieving stock item by SKU:', error);
    throw error;
  }
}

// Function to retrieve stock items by category
export async function getStockItemsByCategory(category: StockCategory): Promise<StockItem[]> {
  try {
    const stockItems = await prisma.stockItem.findMany({
      where: { category: category },
    });
    return stockItems;
  } catch (error) {
    console.error('Error retrieving stock items by category:', error);
    throw error;
  }
}

// Function to retrieve stock items with a quantity below a threshold
export async function getStockItemsBelowThreshold(threshold: number): Promise<StockItem[]> {
  try {
    const stockItems = await prisma.stockItem.findMany({
      where: { quantityAvailable: { lt: threshold } },
    });
    return stockItems;
  } catch (error) {
    console.error('Error retrieving stock items below threshold:', error);
    throw error;
  }
}
