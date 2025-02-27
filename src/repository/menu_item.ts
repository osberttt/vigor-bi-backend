import { PrismaClient, MenuItem, MenuCategory } from '@prisma/client';

const prisma = new PrismaClient();

// Function to retrieve all menu items
export async function getAllMenuItems(): Promise<MenuItem[]> {
  try {
    const menuItems = await prisma.menuItem.findMany();
    return menuItems;
  } catch (error) {
    console.error('Error retrieving menu items:', error);
    throw error;
  }
}

// Function to retrieve a menu item by menu ID
export async function getMenuItemById(menuId: string): Promise<MenuItem | null> {
  try {
    const menuItem = await prisma.menuItem.findUnique({
      where: { menuId: menuId },
    });
    return menuItem;
  } catch (error) {
    console.error('Error retrieving menu item by menu ID:', error);
    throw error;
  }
}

// Function to retrieve menu items by category
export async function getMenuItemsByCategory(category: MenuCategory): Promise<MenuItem[]> {
  try {
    const menuItems = await prisma.menuItem.findMany({
      where: { category: category },
    });
    return menuItems;
  } catch (error) {
    console.error('Error retrieving menu items by category:', error);
    throw error;
  }
}

// Function to retrieve menu items sorted by popularity score
export async function getMenuItemsByPopularity(): Promise<MenuItem[]> {
  try {
    const menuItems = await prisma.menuItem.findMany({
      orderBy: {
        popularityScore: 'desc',
      },
    });
    return menuItems;
  } catch (error) {
    console.error('Error retrieving menu items by popularity:', error);
    throw error;
  }
}
