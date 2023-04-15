/*
  Warnings:

  - You are about to drop the column `availableGenerations` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passDuration` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passSubscription` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Generation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Generation" DROP CONSTRAINT "Generation_authorId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "availableGenerations",
DROP COLUMN "passDuration",
DROP COLUMN "passSubscription",
ADD COLUMN     "credits" INTEGER DEFAULT 0,
ADD COLUMN     "subscriped" BOOLEAN DEFAULT false,
ADD COLUMN     "subscriptionDuration" INTEGER DEFAULT 0;

-- DropTable
DROP TABLE "Generation";

-- CreateTable
CREATE TABLE "generations" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "style" TEXT NOT NULL,
    "image_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,
    "is_favorite" BOOLEAN DEFAULT false,
    "is_private" BOOLEAN DEFAULT false,

    CONSTRAINT "generations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "generations" ADD CONSTRAINT "generations_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
