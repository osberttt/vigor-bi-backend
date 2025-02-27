import { PrismaClient, MenuCategory } from '@prisma/client';

const prisma = new PrismaClient();
const menuPopularityScale = 30;

export async function menuItem() {
  await prisma.menuItem.createMany({
    data: [
      // Coffee
      { menuId: 'CF1', name: 'Espresso', category: MenuCategory.COFFEE, price: 50, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CF2', name: 'Latte', category: MenuCategory.COFFEE, price: 60, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CF3', name: 'Cappuccino', category: MenuCategory.COFFEE, price: 65, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CF4', name: 'Americano', category: MenuCategory.COFFEE, price: 55, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CF5', name: 'Macchiato', category: MenuCategory.COFFEE, price: 58, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CF6', name: 'Mocha', category: MenuCategory.COFFEE, price: 70, popularityScore: Math.random() * menuPopularityScale },

      // Tea
      { menuId: 'T1', name: 'Black Tea', category: MenuCategory.TEA, price: 40, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'T2', name: 'Green Tea', category: MenuCategory.TEA, price: 45, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'T3', name: 'Herbal Tea', category: MenuCategory.TEA, price: 50, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'T4', name: 'Chai Tea', category: MenuCategory.TEA, price: 55, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'T5', name: 'Matcha Tea', category: MenuCategory.TEA, price: 65, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'T6', name: 'Thai Iced Tea', category: MenuCategory.TEA, price: 50, popularityScore: Math.random() * menuPopularityScale },

      // Smoothies
      { menuId: 'S1', name: 'Fruit Smoothie', category: MenuCategory.SMOOTHIES, price: 80, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'S2', name: 'Protein Shake', category: MenuCategory.SMOOTHIES, price: 90, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'S3', name: 'Mango Smoothie', category: MenuCategory.SMOOTHIES, price: 85, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'S4', name: 'Strawberry Banana Smoothie', category: MenuCategory.SMOOTHIES, price: 82, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'S5', name: 'Green Detox Smoothie', category: MenuCategory.SMOOTHIES, price: 95, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'S6', name: 'Coconut Pineapple Smoothie', category: MenuCategory.SMOOTHIES, price: 88, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'S7', name: 'Avocado Smoothie', category: MenuCategory.SMOOTHIES, price: 92, popularityScore: Math.random() * menuPopularityScale },

      // Milkshakes
      { menuId: 'MS1', name: 'Classic Milkshake', category: MenuCategory.MILKSHAKES, price: 70, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'MS2', name: 'Chocolate Milkshake', category: MenuCategory.MILKSHAKES, price: 80, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'MS3', name: 'Vanilla Milkshake', category: MenuCategory.MILKSHAKES, price: 75, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'MS4', name: 'Special Milkshake', category: MenuCategory.MILKSHAKES, price: 85, popularityScore: Math.random() * menuPopularityScale },

      // Juices
      { menuId: 'J1', name: 'Orange Juice', category: MenuCategory.JUICE, price: 60, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'J2', name: 'Lemonade', category: MenuCategory.JUICE, price: 50, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'J3', name: 'Apple Juice', category: MenuCategory.JUICE, price: 55, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'J4', name: 'Watermelon Juice', category: MenuCategory.JUICE, price: 65, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'J5', name: 'Pineapple Juice', category: MenuCategory.JUICE, price: 62, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'J6', name: 'Carrot Juice', category: MenuCategory.JUICE, price: 70, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'J7', name: 'Beet Juice', category: MenuCategory.JUICE, price: 75, popularityScore: Math.random() * menuPopularityScale },

      // Chocolate Drinks
      { menuId: 'CD1', name: 'Hot Chocolate', category: MenuCategory.CHOCOLATE_DRINKS, price: 60, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CD2', name: 'Iced Chocolate', category: MenuCategory.CHOCOLATE_DRINKS, price: 65, popularityScore: Math.random() * menuPopularityScale },

      // Pastries
      { menuId: 'P1', name: 'Croissant', category: MenuCategory.PASTRIES, price: 40, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'P2', name: 'Muffin', category: MenuCategory.PASTRIES, price: 45, popularityScore: Math.random() * menuPopularityScale },

      // Cakes
      { menuId: 'CK1', name: 'Cheesecake', category: MenuCategory.CAKES, price: 90, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CK2', name: 'Chocolate Cake', category: MenuCategory.CAKES, price: 80, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CK3', name: 'Tiramisu', category: MenuCategory.CAKES, price: 80, popularityScore: Math.random() * menuPopularityScale },

      // Cookies
      { menuId: 'CO1', name: 'Cookies', category: MenuCategory.COOKIES, price: 35, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CO2', name: 'Brownies', category: MenuCategory.COOKIES, price: 40, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'CO3', name: 'Macarons', category: MenuCategory.COOKIES, price: 50, popularityScore: Math.random() * menuPopularityScale },

      // Tarts
      { menuId: 'TR1', name: 'Tarts', category: MenuCategory.TARTS, price: 60, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'TR2', name: 'Éclairs', category: MenuCategory.TARTS, price: 65, popularityScore: Math.random() * menuPopularityScale },
      { menuId: 'TR3', name: 'Cream Puffs', category: MenuCategory.TARTS, price: 50, popularityScore: Math.random() * menuPopularityScale },
    ],
  });
}