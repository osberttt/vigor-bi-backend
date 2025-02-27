/*
  Warnings:

  - You are about to drop the column `quantity` on the `purchase` table. All the data in the column will be lost.
  - You are about to drop the column `stockSku` on the `purchase` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `Purchase_stockSku_fkey`;

-- DropIndex
DROP INDEX `Purchase_stockSku_fkey` ON `purchase`;

-- AlterTable
ALTER TABLE `purchase` DROP COLUMN `quantity`,
    DROP COLUMN `stockSku`;

-- CreateTable
CREATE TABLE `PurchaseStockItem` (
    `purchaseId` VARCHAR(191) NOT NULL,
    `stockSku` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `totalPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`purchaseId`, `stockSku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PurchaseStockItem` ADD CONSTRAINT `PurchaseStockItem_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `Purchase`(`purchaseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseStockItem` ADD CONSTRAINT `PurchaseStockItem_stockSku_fkey` FOREIGN KEY (`stockSku`) REFERENCES `StockItem`(`sku`) ON DELETE RESTRICT ON UPDATE CASCADE;
