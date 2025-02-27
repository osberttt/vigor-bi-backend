/*
  Warnings:

  - The values [BEVERAGE] on the enum `StockItem_category` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `category` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menuitem` ADD COLUMN `category` ENUM('COFFEE', 'TEA', 'SMOOTHIES', 'MILKSHAKES', 'JUICE', 'CHOCOLATE_DRINKS', 'PASTRIES', 'CAKES', 'COOKIES', 'TARTS') NOT NULL;

-- AlterTable
ALTER TABLE `stockitem` MODIFY `category` ENUM('COFFEE', 'TEA', 'DAIRY', 'SWEETENER', 'FLAVORING', 'FRUIT', 'NUTS', 'GRAIN', 'CHOCOLATE', 'JUICE', 'ICE', 'PACKAGING', 'OTHER') NOT NULL;
