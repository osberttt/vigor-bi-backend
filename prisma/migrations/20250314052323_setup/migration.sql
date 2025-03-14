-- CreateTable
CREATE TABLE `StockItem` (
    `sku` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` ENUM('COFFEE', 'TEA', 'DAIRY', 'SWEETENER', 'FLAVORING', 'FRUIT', 'NUTS', 'GRAIN', 'CHOCOLATE', 'JUICE', 'ICE', 'PACKAGING', 'OTHER') NOT NULL,
    `quantityAvailable` INTEGER NOT NULL,
    `purchasePrice` DOUBLE NOT NULL,
    `sellingPrice` DOUBLE NOT NULL,
    `lastUpdated` DATETIME(3) NOT NULL,
    `stockLevelThreshold` INTEGER NOT NULL,
    `standardReorderQuantity` INTEGER NOT NULL,
    `popularityScore` DOUBLE NOT NULL,

    PRIMARY KEY (`sku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuItem` (
    `menuId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `category` ENUM('COFFEE', 'TEA', 'SMOOTHIES', 'MILKSHAKES', 'JUICE', 'CHOCOLATE_DRINKS', 'PASTRIES', 'CAKES', 'COOKIES', 'TARTS') NOT NULL,
    `price` DOUBLE NOT NULL,
    `popularityScore` DOUBLE NOT NULL,

    PRIMARY KEY (`menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MenuItemIngredient` (
    `menuItemId` VARCHAR(191) NOT NULL,
    `stockSku` VARCHAR(191) NOT NULL,
    `quantityUsed` DOUBLE NOT NULL,

    PRIMARY KEY (`menuItemId`, `stockSku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `saleId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `totalRevenue` DOUBLE NOT NULL,

    PRIMARY KEY (`saleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleStockItem` (
    `saleId` VARCHAR(191) NOT NULL,
    `stockSku` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `totalPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`saleId`, `stockSku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SaleMenuItem` (
    `saleId` VARCHAR(191) NOT NULL,
    `menuId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `totalPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`saleId`, `menuId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Purchase` (
    `purchaseId` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `totalCost` DOUBLE NOT NULL,

    PRIMARY KEY (`purchaseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PurchaseStockItem` (
    `purchaseId` VARCHAR(191) NOT NULL,
    `stockSku` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `totalPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`purchaseId`, `stockSku`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MenuItemIngredient` ADD CONSTRAINT `MenuItemIngredient_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `MenuItem`(`menuId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MenuItemIngredient` ADD CONSTRAINT `MenuItemIngredient_stockSku_fkey` FOREIGN KEY (`stockSku`) REFERENCES `StockItem`(`sku`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleStockItem` ADD CONSTRAINT `SaleStockItem_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `Sale`(`saleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleStockItem` ADD CONSTRAINT `SaleStockItem_stockSku_fkey` FOREIGN KEY (`stockSku`) REFERENCES `StockItem`(`sku`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleMenuItem` ADD CONSTRAINT `SaleMenuItem_saleId_fkey` FOREIGN KEY (`saleId`) REFERENCES `Sale`(`saleId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SaleMenuItem` ADD CONSTRAINT `SaleMenuItem_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `MenuItem`(`menuId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseStockItem` ADD CONSTRAINT `PurchaseStockItem_purchaseId_fkey` FOREIGN KEY (`purchaseId`) REFERENCES `Purchase`(`purchaseId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PurchaseStockItem` ADD CONSTRAINT `PurchaseStockItem_stockSku_fkey` FOREIGN KEY (`stockSku`) REFERENCES `StockItem`(`sku`) ON DELETE RESTRICT ON UPDATE CASCADE;
