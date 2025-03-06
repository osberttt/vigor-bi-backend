import { Router, Request, Response } from "express";
import {GoogleGenerativeAI, SchemaType} from "@google/generative-ai";
import dotenv from "dotenv";
import { getLastMonthData, getTotalStockRevenue, getTotalMenuRevenue, getTotalCostValueInPeriod, getSalesQuantityInPeriod, getUniqueSKUs, getTotalCostListInMonth} from "../repository/overview";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const router = Router();

const schema_prompt = ` This is prisma schema for our database. generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

// Enums
enum StockCategory {
  COFFEE        // Coffee beans, espresso shots, ground coffee
  TEA           // Loose-leaf tea, tea bags, matcha powder
  DAIRY         // Milk, cream, butter
  SWEETENER     // Sugar, honey, syrups
  FLAVORING     // Cocoa, vanilla, caramel, cinnamon
  FRUIT         // Berries, bananas, citrus fruits
  NUTS          // Almonds, walnuts, pistachios
  GRAIN         // Flour, baking powder, yeast
  CHOCOLATE     // Dark, milk, white chocolate
  JUICE         // Fresh fruit juices, concentrates
  ICE           // Ice cubes, crushed ice
  PACKAGING     // Cups, lids, straws, takeaway boxes
  OTHER         // Miscellaneous items like toppings, garnishes
}

enum MenuCategory {
  COFFEE            // Espresso, latte, cappuccino, americano, macchiato, mocha
  TEA               // Black, green, herbal, chai, matcha
  SMOOTHIES         // Fruit smoothies, protein shakes
  MILKSHAKES        // Classic, chocolate, vanilla, special flavors
  JUICE             // Fresh juices, lemonades
  CHOCOLATE_DRINKS  // Hot and cold chocolate drinks
  PASTRIES          // Croissants, muffins
  CAKES             // Cheesecake, chocolate cake, tiramisu
  COOKIES           // Cookies, brownies, macarons
  TARTS             // Tarts, éclairs, cream puffs
}

// StockItem Model
model StockItem {
  sku                     String        @id
  name                    String
  category                StockCategory
  quantityAvailable       Int
  purchasePrice           Float
  sellingPrice            Float
  lastUpdated             DateTime      @updatedAt
  stockLevelThreshold     Int
  standardReorderQuantity Int
  popularityScore         Float

  // Relations
  purchases      PurchaseStockItem[]
  menuItems      MenuItemIngredient[]
  SaleStockItem  SaleStockItem[]
}

// MenuItem Model
model MenuItem {
  menuId          String          @id
  name            String
  category        MenuCategory
  price           Float
  popularityScore Float
  ingredients     MenuItemIngredient[]
  SaleMenuItem    SaleMenuItem[]
}


// Many-to-Many Relation Table for MenuItem & StockItem (with quantity used)
model MenuItemIngredient {
  menuItemId   String
  stockSku     String
  quantityUsed Float  // Float allows fractional measurements like 0.5 cups

  menuItem  MenuItem  @relation(fields: [menuItemId], references: [menuId], onDelete: Cascade)
  stockItem StockItem @relation(fields: [stockSku], references: [sku], onDelete: Cascade)

  @@id([menuItemId, stockSku])
}

  // Sale Model
  model Sale {
    saleId       String   @id
    date         DateTime
    totalRevenue Float

    stockItemsSold SaleStockItem[]
    menuItemsSold  SaleMenuItem[]
  }

  // Many-to-Many Relation Table for Sale & StockItem
  model SaleStockItem {
    saleId     String
    stockSku   String
    quantity   Int
    totalPrice Float

    sale      Sale      @relation(fields: [saleId], references: [saleId])
    stockItem StockItem @relation(fields: [stockSku], references: [sku])

    @@id([saleId, stockSku])
  }

  // Many-to-Many Relation Table for Sale & MenuItem
  model SaleMenuItem {
    saleId     String
    menuId     String
    quantity   Int
    totalPrice Float

    sale     Sale     @relation(fields: [saleId], references: [saleId])
    menuItem MenuItem @relation(fields: [menuId], references: [menuId])

    @@id([saleId, menuId])
  }

// Purchase Model
model Purchase {
  purchaseId     String   @id
  date           DateTime
  totalCost      Float

  stockItemsPurchased PurchaseStockItem[]
}

model PurchaseStockItem {
  purchaseId String
  stockSku   String
  quantity   Int
  totalPrice Float

  purchase  Purchase  @relation(fields: [purchaseId], references: [purchaseId])
  stockItem StockItem @relation(fields: [stockSku], references: [sku])

  @@id([purchaseId, stockSku])
}
`
router.get("/overview", async (req: Request, res: Response) => {
    let instruction_prompt = "Write a short insight of one or two sentences for the data. The insight should be concise and helpful to the user - don't just write a description.";
    let data_prompt = "";
    try{
        const id = req.query.id as string;
        const dateString = req.query.end as string;
        const endDate = new Date(dateString);
        switch (id) {
            case "sku":
                const sku_data = await getUniqueSKUs(endDate);
                data_prompt = JSON.stringify(sku_data);
                break;
            case "cost":
                const cost_data = await getTotalCostListInMonth(endDate);
                data_prompt = JSON.stringify(cost_data);
            case "revenue":
                const menuRevenue = await getTotalMenuRevenue(endDate);  
                const stockRevenue = await getTotalStockRevenue(endDate);
                data_prompt = JSON.stringify({menuRevenue, stockRevenue})
            default:
                break;
        }
        const prompt = schema_prompt + instruction_prompt + data_prompt
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        res.json({data:result.response.text()});
    } catch(error){
        console.log(error);
    }
});


export default router;


