/*
  Warnings:

  - Added the required column `popularityScore` to the `StockItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `stockitem` ADD COLUMN `popularityScore` DOUBLE NOT NULL;
