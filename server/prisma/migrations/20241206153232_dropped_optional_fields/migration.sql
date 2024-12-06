/*
  Warnings:

  - Made the column `title` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `price` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `category` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sold` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `dateOfSale` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "price" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "category" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "sold" SET NOT NULL,
ALTER COLUMN "dateOfSale" SET NOT NULL;
