/*
  Warnings:

  - You are about to drop the column `subscriped` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "subscriped",
ADD COLUMN     "subscrided" BOOLEAN DEFAULT false,
ALTER COLUMN "credits" SET DEFAULT 3;
