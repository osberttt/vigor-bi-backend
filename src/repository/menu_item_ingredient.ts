import { PrismaClient, MenuItemIngredient, MenuItem, StockItem } from '@prisma/client';

const prisma = new PrismaClient();

// Function to retrieve all menu item ingredients
export async function getAllMenuItemIngredients(): Promise<MenuItemIngredient[]> {
  try {
    const menuItemIngredients = await prisma.menuItemIngredient.findMany();
    return menuItemIngredients;
  } catch (error) {
    console.error('Error retrieving menu item ingredients:', error);
    throw error;
  }
}

// Function to retrieve a menu item ingredient by menu item ID and stock SKU
export async function getMenuItemIngredientByMenuItemIdAndSku(menuItemId: string, stockSku: string): Promise<MenuItemIngredient | null> {
  try {
    const menuItemIngredient = await prisma.menuItemIngredient.findUnique({
      where: {
        menuItemId_stockSku: {
          menuItemId: menuItemId,
          stockSku: stockSku,
        },
      },
    });
    return menuItemIngredient;
  } catch (error) {
    console.error('Error retrieving menu item ingredient by menu item ID and stock SKU:', error);
    throw error;
  }
}

// Function to retrieve all ingredients for a specific menu item
export async function getIngredientsByMenuItem(menuItemId: string): Promise<MenuItemIngredient[]> {
  try {
    const menuItemIngredients = await prisma.menuItemIngredient.findMany({
      where: { menuItemId: menuItemId },
    });
    return menuItemIngredients;
  } catch (error) {
    console.error('Error retrieving ingredients by menu item ID:', error);
    throw error;
  }
}

// Function to retrieve all ingredients used by a specific stock item
export async function getMenuItemsByStockItem(sku: string): Promise<MenuItemIngredient[]> {
  try {
    const menuItemIngredients = await prisma.menuItemIngredient.findMany({
      where: { stockSku: sku },
    });
    return menuItemIngredients;
  } catch (error) {
    console.error('Error retrieving menu items by stock item SKU:', error);
    throw error;
  }
}
