import { menuItem } from "./seed/menu_item";
import { menuItemIngredient } from "./seed/menu_item_ingredient";
import { purchase } from "./seed/purchase";
import { sale } from "./seed/sale";
import { stockItem } from "./seed/stock_item";

async function run() {
  try {

    await stockItem();
    await menuItem();
    await menuItemIngredient();
    await sale();
    await purchase();
  
    console.log('All operations completed successfully');
  } catch (error) {
    console.error('An error occurred:', error);
    process.exit(1);
  }
}

run();

