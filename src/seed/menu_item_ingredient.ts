import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function menuItemIngredient() {
  await prisma.menuItemIngredient.createMany({
    data: [
        // Coffee
        { menuItemId: 'CF1', stockSku: 'SB1', quantityUsed: 0.015 }, // Espresso: 0.015kg Coffee Beans
        { menuItemId: 'CF1', stockSku: 'SB2', quantityUsed: 1 }, // Espresso: 1 shot Espresso
        { menuItemId: 'CF2', stockSku: 'SB1', quantityUsed: 0.015 }, // Latte: 0.015kg Coffee Beans
        { menuItemId: 'CF2', stockSku: 'SB2', quantityUsed: 1 }, // Latte: 1 shot Espresso
        { menuItemId: 'CF2', stockSku: 'SB8', quantityUsed: 0.2 }, // Latte: 0.2L Milk
        { menuItemId: 'CF3', stockSku: 'SB1', quantityUsed: 0.015 }, // Cappuccino: 0.015kg Coffee Beans
        { menuItemId: 'CF3', stockSku: 'SB2', quantityUsed: 1 }, // Cappuccino: 1 shot Espresso
        { menuItemId: 'CF3', stockSku: 'SB8', quantityUsed: 0.15 }, // Cappuccino: 0.15L Milk
        { menuItemId: 'CF3', stockSku: 'SB16', quantityUsed: 0.0005 }, // Cappuccino: 0.0005kg Cinnamon
        { menuItemId: 'CF4', stockSku: 'SB1', quantityUsed: 0.015 }, // Americano: 0.015kg Coffee Beans
        { menuItemId: 'CF4', stockSku: 'SB2', quantityUsed: 2 }, // Americano: 2 shots Espresso
        { menuItemId: 'CF5', stockSku: 'SB1', quantityUsed: 0.015 }, // Macchiato: 0.015kg Coffee Beans
        { menuItemId: 'CF5', stockSku: 'SB2', quantityUsed: 1 }, // Macchiato: 1 shot Espresso
        { menuItemId: 'CF5', stockSku: 'SB8', quantityUsed: 0.05 }, // Macchiato: 0.05L Milk
        { menuItemId: 'CF5', stockSku: 'SB13', quantityUsed: 0.01 }, // Macchiato: 0.01L Vanilla Syrup
        { menuItemId: 'CF6', stockSku: 'SB1', quantityUsed: 0.015 }, // Mocha: 0.015kg Coffee Beans
        { menuItemId: 'CF6', stockSku: 'SB2', quantityUsed: 1 }, // Mocha: 1 shot Espresso
        { menuItemId: 'CF6', stockSku: 'SB8', quantityUsed: 0.2 }, // Mocha: 0.2L Milk
        { menuItemId: 'CF6', stockSku: 'SB14', quantityUsed: 0.02 }, // Mocha: 0.02kg Cocoa Powder
        { menuItemId: 'CF6', stockSku: 'SB9', quantityUsed: 0.03 }, // Mocha: 0.03L Cream
        { menuItemId: 'CF6', stockSku: 'SB15', quantityUsed: 0.015 }, // Mocha: 0.015L Caramel Syrup
    
        // Tea
        { menuItemId: 'T1', stockSku: 'SB4', quantityUsed: 0.01 }, // Black Tea: 0.01kg Loose-leaf Tea
        { menuItemId: 'T1', stockSku: 'SB5', quantityUsed: 1 }, // Black Tea: 1 Tea Bag
        { menuItemId: 'T2', stockSku: 'SB4', quantityUsed: 0.01 }, // Green Tea: 0.01kg Loose-leaf Tea
        { menuItemId: 'T2', stockSku: 'SB5', quantityUsed: 1 }, // Green Tea: 1 Tea Bag
        { menuItemId: 'T3', stockSku: 'SB4', quantityUsed: 0.01 }, // Herbal Tea: 0.01kg Loose-leaf Tea
        { menuItemId: 'T3', stockSku: 'SB5', quantityUsed: 1 }, // Herbal Tea: 1 Tea Bag
        { menuItemId: 'T4', stockSku: 'SB4', quantityUsed: 0.01 }, // Chai Tea: 0.01kg Loose-leaf Tea
        { menuItemId: 'T4', stockSku: 'SB5', quantityUsed: 1 }, // Chai Tea: 1 Tea Bag
        { menuItemId: 'T4', stockSku: 'SB16', quantityUsed: 0.0005 }, // Chai Tea: 0.0005kg Cinnamon
        { menuItemId: 'T5', stockSku: 'SB6', quantityUsed: 0.005 }, // Matcha Tea: 0.005kg Matcha Powder
        { menuItemId: 'T6', stockSku: 'SB7', quantityUsed: 0.01}, //Thai tea: 0.01kg Thai Tea mix.
    
        // Smoothies
        { menuItemId: 'S1', stockSku: 'SB17', quantityUsed: 0.1 }, // Fruit Smoothie: 0.1kg Strawberries
        { menuItemId: 'S1', stockSku: 'SB18', quantityUsed: 0.05 }, // Fruit Smoothie: 0.05kg Bananas
        { menuItemId: 'S1', stockSku: 'SB36', quantityUsed: 0.1 }, // Fruit Smoothie: 0.1L Orange Juice
        { menuItemId: 'S2', stockSku: 'SB8', quantityUsed: 0.25 }, // Protein Shake: 0.25L Milk
        { menuItemId: 'S3', stockSku: 'SB20', quantityUsed: 0.2 }, // Mango Smoothie: 0.2kg Mangoes
        { menuItemId: 'S4', stockSku: 'SB17', quantityUsed: 0.15 }, // Strawberry Banana Smoothie: 0.15kg Strawberries
        { menuItemId: 'S4', stockSku: 'SB18', quantityUsed: 0.1 }, // Strawberry Banana Smoothie: 0.1kg Bananas
        { menuItemId: 'S5', stockSku: 'SB27', quantityUsed: 0.05}, //Green Detox smoothie: 0.05kg Almonds
        { menuItemId: 'S6', stockSku: 'SB21', quantityUsed: 0.15}, //Coconut pineapple smoothie: 0.15kg Pineapples
        { menuItemId: 'S7', stockSku: 'SB22', quantityUsed: 0.12}, //Avocado smoothie: 0.12kg Avocados
    
        // Milkshakes
        { menuItemId: 'MS1', stockSku: 'SB8', quantityUsed: 0.3 }, // Classic Milkshake: 0.3L Milk
        { menuItemId: 'MS2', stockSku: 'SB8', quantityUsed: 0.3 }, // Chocolate Milkshake: 0.3L Milk
        { menuItemId: 'MS2', stockSku: 'SB33', quantityUsed: 0.05 }, // Chocolate Milkshake: 0.05kg Dark Chocolate
        { menuItemId: 'MS3', stockSku: 'SB8', quantityUsed: 0.3 }, // Vanilla Milkshake: 0.3L Milk
        { menuItemId: 'MS3', stockSku: 'SB13', quantityUsed: 0.02 }, // Vanilla Milkshake: 0.02L Vanilla Syrup
        { menuItemId: 'MS4', stockSku: 'SB8', quantityUsed: 0.3 }, // Special Milkshake: 0.3L Milk
        { menuItemId: 'MS4', stockSku: 'SB33', quantityUsed: 0.05 }, // Special Milkshake: 0.05kg Dark Chocolate
        { menuItemId: 'MS4', stockSku: 'SB9', quantityUsed: 0.05 }, // Special Milkshake: 0.05L Cream
        { menuItemId: 'MS4', stockSku: 'SB15', quantityUsed: 0.02 }, // Special Milkshake: 0.02L Caramel Syrup
        { menuItemId: 'MS4', stockSku: 'SB35', quantityUsed: 0.02}, // Special Milkshake: 0.02kg White Chocolate
    
        // Juices
        { menuItemId: 'J1', stockSku: 'SB36', quantityUsed: 0.25 }, // Orange Juice: 0.25L Orange Juice
        { menuItemId: 'J2', stockSku: 'SB19', quantityUsed: 0.1 }, // Lemonade: 0.1kg Lemons
        { menuItemId: 'J2', stockSku: 'SB11', quantityUsed: 0.03 }, // Lemonade: 0.03kg Sugar
        { menuItemId: 'J3', stockSku: 'SB37', quantityUsed: 0.25 }, // Apple Juice: 0.25L Apple Juice
        { menuItemId: 'J4', stockSku: 'SB23', quantityUsed: 0.3 }, // Watermelon juice: 0.3kg Watermelons
        { menuItemId: 'J5', stockSku: 'SB21', quantityUsed: 0.25 }, // Pineapple juice: 0.25kg Pineapples
        { menuItemId: 'J6', stockSku: 'SB25', quantityUsed: 0.2 }, // Carrot juice: 0.2kg Carrots
        { menuItemId: 'J7', stockSku: 'SB26', quantityUsed: 0.2 }, // Beet juice: 0.2kg Beets
    
        // Chocolate Drinks
        { menuItemId: 'CD1', stockSku: 'SB8', quantityUsed: 0.25 }, // Hot Chocolate: 0.25L Milk
        { menuItemId: 'CD1', stockSku: 'SB33', quantityUsed: 0.03 }, // Hot Chocolate: 0.03kg Dark Chocolate
        { menuItemId: 'CD2', stockSku: 'SB8', quantityUsed: 0.25 }, // Iced Chocolate: 0.25L Milk
        { menuItemId: 'CD2', stockSku: 'SB33', quantityUsed: 0.03 }, // Iced Chocolate: 0.03kg Dark Chocolate
        { menuItemId: 'CD2', stockSku: 'SB38', quantityUsed: 0.2 }, // Iced Chocolate: 0.2kg Ice Cubes
    
        // Pastries
        { menuItemId: 'P1', stockSku: 'SB30', quantityUsed: 0.1 }, // Croissant: 0.1kg Flour
        { menuItemId: 'P1', stockSku: 'SB31', quantityUsed: 0.005 }, // Croissant: 0.005kg Baking Powder
        { menuItemId: 'P1', stockSku: 'SB32', quantityUsed: 0.01 }, // Croissant: 0.01kg Yeast
        { menuItemId: 'P1', stockSku: 'SB10', quantityUsed: 0.05 }, // Croissant: 0.05kg Butter
        { menuItemId: 'P2', stockSku: 'SB30', quantityUsed: 0.15 }, // Muffin: 0.15kg Flour
        { menuItemId: 'P2', stockSku: 'SB31', quantityUsed: 0.008 }, // Muffin: 0.008kg Baking Powder
        { menuItemId: 'P2', stockSku: 'SB10', quantityUsed: 0.07 }, // Muffin: 0.07kg Butter
    
        // Cakes
        { menuItemId: 'CK1', stockSku: 'SB30', quantityUsed: 0.2 }, // Cheesecake: 0.2kg Flour
        { menuItemId: 'CK1', stockSku: 'SB31', quantityUsed: 0.01 }, // Cheesecake: 0.01kg Baking Powder
        { menuItemId: 'CK1', stockSku: 'SB9', quantityUsed: 0.3 }, // Cheesecake: 0.3L Cream
        { menuItemId: 'CK1', stockSku: 'SB35', quantityUsed: 0.05 }, // Cheesecake: 0.05kg White Chocolate
        { menuItemId: 'CK2', stockSku: 'SB30', quantityUsed: 0.25 }, // Chocolate Cake: 0.25kg Flour
        { menuItemId: 'CK2', stockSku: 'SB31', quantityUsed: 0.012 }, // Chocolate Cake: 0.012kg Baking Powder
        { menuItemId: 'CK2', stockSku: 'SB33', quantityUsed: 0.1 }, // Chocolate Cake: 0.1kg Dark Chocolate
        { menuItemId: 'CK2', stockSku: 'SB10', quantityUsed: 0.1 }, // Chocolate Cake: 0.1kg Butter
        { menuItemId: 'CK3', stockSku: 'SB30', quantityUsed: 0.2 }, // Tiramisu: 0.2kg Flour
        { menuItemId: 'CK3', stockSku: 'SB31', quantityUsed: 0.01 }, // Tiramisu: 0.01kg Baking Powder
    
        // Cookies
        { menuItemId: 'CO1', stockSku: 'SB30', quantityUsed: 0.1 }, // Cookies: 0.1kg Flour
        { menuItemId: 'CO1', stockSku: 'SB31', quantityUsed: 0.005 }, // Cookies: 0.005kg Baking Powder
        { menuItemId: 'CO2', stockSku: 'SB30', quantityUsed: 0.15 }, // Brownies: 0.15kg Flour
        { menuItemId: 'CO2', stockSku: 'SB31', quantityUsed: 0.008 }, // Brownies: 0.008kg Baking Powder
        { menuItemId: 'CO2', stockSku: 'SB33', quantityUsed: 0.07 }, // Brownies: 0.07kg Dark Chocolate
        { menuItemId: 'CO3', stockSku: 'SB30', quantityUsed: 0.08 }, // Macarons: 0.08kg Flour
    
        // Tarts
        { menuItemId: 'TR1', stockSku: 'SB30', quantityUsed: 0.12 }, // Tarts: 0.12kg Flour
        { menuItemId: 'TR1', stockSku: 'SB31', quantityUsed: 0.006 }, // Tarts: 0.006kg Baking Powder
        { menuItemId: 'TR2', stockSku: 'SB30', quantityUsed: 0.15 }, // Eclairs: 0.15kg Flour
        { menuItemId: 'TR2', stockSku: 'SB31', quantityUsed: 0.008 }, // Eclairs: 0.008kg Baking Powder
        { menuItemId: 'TR3', stockSku: 'SB30', quantityUsed: 0.1 }, // Cream Puffs: 0.1kg Flour
        { menuItemId: 'TR3', stockSku: 'SB31', quantityUsed: 0.005 }, // Cream Puffs: 0.005kg Baking Powder
        { menuItemId: 'TR3', stockSku: 'SB32', quantityUsed: 0.01 }, // Cream Puffs: 0.01kg Yeast
      ]
  });
}