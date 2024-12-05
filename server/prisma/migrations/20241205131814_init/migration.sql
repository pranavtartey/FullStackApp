-- CreateTable
CREATE TABLE "Item" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "price" INTEGER,
    "description" TEXT,
    "category" TEXT,
    "image" TEXT,
    "sold" BOOLEAN,
    "dateOfSale" TIMESTAMP(3),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);
