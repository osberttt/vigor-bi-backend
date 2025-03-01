import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getStockItems() {
    const data = await prisma.stockItem.findMany();
    return data;
}