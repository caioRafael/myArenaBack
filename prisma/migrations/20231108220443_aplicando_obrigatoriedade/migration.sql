/*
  Warnings:

  - Made the column `price` on table `shcedule_time` required. This step will fail if there are existing NULL values in that column.
  - Made the column `status` on table `shcedule_time` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_shcedule_time" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "hour" REAL NOT NULL,
    "endHour" REAL NOT NULL,
    "amountHours" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    CONSTRAINT "shcedule_time_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_shcedule_time" ("amountHours", "clientName", "clientPhone", "date", "endHour", "fieldId", "hour", "id", "price", "sport", "status") SELECT "amountHours", "clientName", "clientPhone", "date", "endHour", "fieldId", "hour", "id", "price", "sport", "status" FROM "shcedule_time";
DROP TABLE "shcedule_time";
ALTER TABLE "new_shcedule_time" RENAME TO "shcedule_time";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
