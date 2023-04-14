/*
  Warnings:

  - You are about to drop the column `subscribed` on the `users` table. All the data in the column will be lost.
  - Added the required column `style` to the `Generation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Generation" ADD COLUMN     "style" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "subscribed",
ADD COLUMN     "availableGenerations" INTEGER DEFAULT 0,
ADD COLUMN     "passSubscription" BOOLEAN DEFAULT false;
