/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `shcedule_time` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `shcedule_time` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shcedule_time" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "shcedule_time_code_key" ON "shcedule_time"("code");
