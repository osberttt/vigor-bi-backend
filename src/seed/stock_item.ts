import { PrismaClient, StockCategory } from '@prisma/client';

const prisma = new PrismaClient();
const stockPopularityScale = 10;
export async function stockItem() {
  await prisma.stockItem.createMany({
    data: [
      // Coffee (Prices in Thai Baht)
      { sku: 'SB1', name: 'Coffee Beans', category: StockCategory.COFFEE, quantityAvailable: 100, purchasePrice: 450, sellingPrice: 500, stockLevelThreshold: 20, standardReorderQuantity: 50, popularityScore: Math.random() * stockPopularityScale }, // 450 THB/kg
      { sku: 'SB2', name: 'Espresso Shots', category: StockCategory.COFFEE, quantityAvailable: 200, purchasePrice: 15, sellingPrice: 20, stockLevelThreshold: 30, standardReorderQuantity: 100, popularityScore: Math.random() * stockPopularityScale }, // 15 THB/shot

      // Tea (Prices in Thai Baht)
      { sku: 'SB4', name: 'Loose-leaf Tea', category: StockCategory.TEA, quantityAvailable: 50, purchasePrice: 360, sellingPrice: 400, stockLevelThreshold: 10, standardReorderQuantity: 30, popularityScore: Math.random() * stockPopularityScale }, // 360 THB/kg
      { sku: 'SB5', name: 'Tea Bags', category: StockCategory.TEA, quantityAvailable: 200, purchasePrice: 15, sellingPrice: 20, stockLevelThreshold: 50, standardReorderQuantity: 100, popularityScore: Math.random() * stockPopularityScale }, // 15 THB/bag
      { sku: 'SB6', name: 'Matcha Powder', category: StockCategory.TEA, quantityAvailable: 30, purchasePrice: 600, sellingPrice: 650, stockLevelThreshold: 10, standardReorderQuantity: 15, popularityScore: Math.random() * stockPopularityScale }, // 600 THB/kg
      { sku: 'SB7', name: 'Thai Tea Mix', category: StockCategory.TEA, quantityAvailable: 100, purchasePrice: 240, sellingPrice: 280, stockLevelThreshold: 20, standardReorderQuantity: 50, popularityScore: Math.random() * stockPopularityScale }, // 240 THB/kg

      // Dairy (Prices in Thai Baht)
      { sku: 'SB8', name: 'Milk', category: StockCategory.DAIRY, quantityAvailable: 100, purchasePrice: 60, sellingPrice: 70, stockLevelThreshold: 20, standardReorderQuantity: 50, popularityScore: Math.random() * stockPopularityScale }, // 60 THB/liter
      { sku: 'SB9', name: 'Cream', category: StockCategory.DAIRY, quantityAvailable: 75, purchasePrice: 90, sellingPrice: 100, stockLevelThreshold: 15, standardReorderQuantity: 30, popularityScore: Math.random() * stockPopularityScale }, // 90 THB/liter
      { sku: 'SB10', name: 'Butter', category: StockCategory.DAIRY, quantityAvailable: 40, purchasePrice: 135, sellingPrice: 150, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 135 THB/kg

      // Sweetener (Prices in Thai Baht)
      { sku: 'SB11', name: 'Sugar', category: StockCategory.SWEETENER, quantityAvailable: 150, purchasePrice: 45, sellingPrice: 50, stockLevelThreshold: 30, standardReorderQuantity: 60, popularityScore: Math.random() * stockPopularityScale }, // 45 THB/kg
      { sku: 'SB12', name: 'Honey', category: StockCategory.SWEETENER, quantityAvailable: 50, purchasePrice: 180, sellingPrice: 200, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 180 THB/kg
      { sku: 'SB13', name: 'Vanilla Syrup', category: StockCategory.SWEETENER, quantityAvailable: 60, purchasePrice: 120, sellingPrice: 130, stockLevelThreshold: 15, standardReorderQuantity: 30, popularityScore: Math.random() * stockPopularityScale }, // 120 THB/liter

      // Flavoring (Prices in Thai Baht)
      { sku: 'SB14', name: 'Cocoa Powder', category: StockCategory.FLAVORING, quantityAvailable: 40, purchasePrice: 240, sellingPrice: 260, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 240 THB/kg
      { sku: 'SB15', name: 'Caramel Syrup', category: StockCategory.FLAVORING, quantityAvailable: 70, purchasePrice: 150, sellingPrice: 165, stockLevelThreshold: 20, standardReorderQuantity: 40, popularityScore: Math.random() * stockPopularityScale }, // 150 THB/liter
      { sku: 'SB16', name: 'Cinnamon', category: StockCategory.FLAVORING, quantityAvailable: 30, purchasePrice: 75, sellingPrice: 85, stockLevelThreshold: 5, standardReorderQuantity: 15, popularityScore: Math.random() * stockPopularityScale }, // 75 THB/kg

      // Fruit (Prices in Thai Baht)
      { sku: 'SB17', name: 'Strawberries', category: StockCategory.FRUIT, quantityAvailable: 50, purchasePrice: 90, sellingPrice: 100, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 90 THB/kg
      { sku: 'SB18', name: 'Bananas', category: StockCategory.FRUIT, quantityAvailable: 100, purchasePrice: 30, sellingPrice: 35, stockLevelThreshold: 20, standardReorderQuantity: 40, popularityScore: Math.random() * stockPopularityScale }, // 30 THB/kg
      { sku: 'SB19', name: 'Lemons', category: StockCategory.FRUIT, quantityAvailable: 60, purchasePrice: 60, sellingPrice: 70, stockLevelThreshold: 15, standardReorderQuantity: 30, popularityScore: Math.random() * stockPopularityScale }, // 60 THB/kg
      { sku: 'SB20', name: 'Mangoes', category: StockCategory.FRUIT, quantityAvailable: 80, purchasePrice: 120, sellingPrice: 135, stockLevelThreshold: 15, standardReorderQuantity: 30, popularityScore: Math.random() * stockPopularityScale }, // 120 THB/kg
      { sku: 'SB21', name: 'Pineapples', category: StockCategory.FRUIT, quantityAvailable: 60, purchasePrice: 105, sellingPrice: 120, stockLevelThreshold: 12, standardReorderQuantity: 25, popularityScore: Math.random() * stockPopularityScale }, // 105 THB/kg
      { sku: 'SB22', name: 'Avocados', category: StockCategory.FRUIT, quantityAvailable: 40, purchasePrice: 150, sellingPrice: 170, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 150 THB/kg
      { sku: 'SB23', name: 'Watermelons', category: StockCategory.FRUIT, quantityAvailable: 70, purchasePrice: 90, sellingPrice: 100, stockLevelThreshold: 15, standardReorderQuantity: 25, popularityScore: Math.random() * stockPopularityScale }, // 90 THB/kg
      { sku: 'SB24', name: 'Apples', category: StockCategory.FRUIT, quantityAvailable: 60, purchasePrice: 90, sellingPrice: 100, stockLevelThreshold: 12, standardReorderQuantity: 25, popularityScore: Math.random() * stockPopularityScale }, // 90 THB/kg
      { sku: 'SB25', name: 'Carrots', category: StockCategory.FRUIT, quantityAvailable: 50, purchasePrice: 75, sellingPrice: 85, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 75 THB/kg
      { sku: 'SB26', name: 'Beets', category: StockCategory.FRUIT, quantityAvailable: 40, purchasePrice: 105, sellingPrice: 120, stockLevelThreshold: 8, standardReorderQuantity: 15, popularityScore: Math.random() * stockPopularityScale }, // 105 THB/kg

      // Nuts (Prices in Thai Baht)
      { sku: 'SB27', name: 'Almonds', category: StockCategory.NUTS, quantityAvailable: 40, purchasePrice: 150, sellingPrice: 170, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 150 THB/kg
      { sku: 'SB28', name: 'Walnuts', category: StockCategory.NUTS, quantityAvailable: 30, purchasePrice: 180, sellingPrice: 200, stockLevelThreshold: 5, standardReorderQuantity: 15, popularityScore: Math.random() * stockPopularityScale }, // 180 THB/kg
      { sku: 'SB29', name: 'Pistachios', category: StockCategory.NUTS, quantityAvailable: 25, purchasePrice: 210, sellingPrice: 230, stockLevelThreshold: 5, standardReorderQuantity: 10, popularityScore: Math.random() * stockPopularityScale }, // 210 THB/kg

      // Grain (Prices in Thai Baht)
      { sku: 'SB30', name: 'Flour', category: StockCategory.GRAIN, quantityAvailable: 100, purchasePrice: 90, sellingPrice: 100, stockLevelThreshold: 20, standardReorderQuantity: 50, popularityScore: Math.random() * stockPopularityScale }, // 90 THB/kg
      { sku: 'SB31', name: 'Baking Powder', category: StockCategory.GRAIN, quantityAvailable: 30, purchasePrice: 60, sellingPrice: 70, stockLevelThreshold: 5, standardReorderQuantity: 15, popularityScore: Math.random() * stockPopularityScale }, // 60 THB/kg
      { sku: 'SB32', name: 'Yeast', category: StockCategory.GRAIN, quantityAvailable: 40, purchasePrice: 120, sellingPrice: 130, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 120 THB/kg

      // Chocolate (Prices in Thai Baht)
      { sku: 'SB33', name: 'Dark Chocolate', category: StockCategory.CHOCOLATE, quantityAvailable: 50, purchasePrice: 150, sellingPrice: 170, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 150 THB/kg
      { sku: 'SB34', name: 'Milk Chocolate', category: StockCategory.CHOCOLATE, quantityAvailable: 75, purchasePrice: 120, sellingPrice: 135, stockLevelThreshold: 15, standardReorderQuantity: 30, popularityScore: Math.random() * stockPopularityScale }, // 120 THB/kg
      { sku: 'SB35', name: 'White Chocolate', category: StockCategory.CHOCOLATE, quantityAvailable: 60, purchasePrice: 180, sellingPrice: 200, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 180 THB/kg

      // Juice (Prices in Thai Baht)
      { sku: 'SB36', name: 'Orange Juice', category: StockCategory.JUICE, quantityAvailable: 50, purchasePrice: 120, sellingPrice: 130, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 120 THB/liter
      { sku: 'SB37', name: 'Apple Juice', category: StockCategory.JUICE, quantityAvailable: 40, purchasePrice: 105, sellingPrice: 120, stockLevelThreshold: 8, standardReorderQuantity: 15, popularityScore: Math.random() * stockPopularityScale }, // 105 THB/liter

      // Ice (Prices in Thai Baht)
      { sku: 'SB38', name: 'Ice Cubes', category: StockCategory.ICE, quantityAvailable: 200, purchasePrice: 15, sellingPrice: 20, stockLevelThreshold: 50, standardReorderQuantity: 100, popularityScore: Math.random() * stockPopularityScale }, // 15 THB/kg
      { sku: 'SB39', name: 'Crushed Ice', category: StockCategory.ICE, quantityAvailable: 150, purchasePrice: 24, sellingPrice: 30, stockLevelThreshold: 30, standardReorderQuantity: 50, popularityScore: Math.random() * stockPopularityScale }, // 24 THB/kg

      // Packaging (Prices in Thai Baht)
      { sku: 'SB40', name: 'Cups', category: StockCategory.PACKAGING, quantityAvailable: 500, purchasePrice: 3, sellingPrice: 4, stockLevelThreshold: 100, standardReorderQuantity: 200, popularityScore: Math.random() * stockPopularityScale }, // 3 THB/unit
      { sku: 'SB41', name: 'Lids', category: StockCategory.PACKAGING, quantityAvailable: 500, purchasePrice: 1.5, sellingPrice: 2, stockLevelThreshold: 100, standardReorderQuantity: 200, popularityScore: Math.random() * stockPopularityScale }, // 1.stockPopularityScale THB/unit
      { sku: 'SB42', name: 'Straws', category: StockCategory.PACKAGING, quantityAvailable: 300, purchasePrice: 0.6, sellingPrice: 1, stockLevelThreshold: 50, standardReorderQuantity: 100, popularityScore: Math.random() * stockPopularityScale }, // 0.6 THB/unit
      { sku: 'SB43', name: 'Takeaway Boxes', category: StockCategory.PACKAGING, quantityAvailable: 200, purchasePrice: 15, sellingPrice: 20, stockLevelThreshold: 50, standardReorderQuantity: 100, popularityScore: Math.random() * stockPopularityScale }, // 15 THB/unit

      // Other (Prices in Thai Baht)
      { sku: 'SB44', name: 'Toppings', category: StockCategory.OTHER, quantityAvailable: 50, purchasePrice: 60, sellingPrice: 70, stockLevelThreshold: 10, standardReorderQuantity: 20, popularityScore: Math.random() * stockPopularityScale }, // 60 THB/kg
      { sku: 'SB45', name: 'Garnishes', category: StockCategory.OTHER, quantityAvailable: 30, purchasePrice: 30, sellingPrice: 40, stockLevelThreshold: 5, standardReorderQuantity: 15, popularityScore: Math.random() * stockPopularityScale }, // 30 THB/kg
    ],
  });
}