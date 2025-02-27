/*
  Warnings:

  - You are about to drop the column `unitPrice` on the `stockitem` table. All the data in the column will be lost.
  - Added the required column `purchasePrice` to the `StockItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sellingPrice` to the `StockItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockitem` DROP COLUMN `unitPrice`,
    ADD COLUMN `purchasePrice` DOUBLE NOT NULL,
    ADD COLUMN `sellingPrice` DOUBLE NOT NULL;
