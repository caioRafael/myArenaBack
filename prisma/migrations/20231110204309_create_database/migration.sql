/*
  Warnings:

  - You are about to drop the column `administratorId` on the `arena` table. All the data in the column will be lost.
  - Added the required column `profile` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "avatar" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "arenaId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "user_arenaId_fkey" FOREIGN KEY ("arenaId") REFERENCES "arena" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_user" ("createdAt", "email", "id", "name", "nickname", "password") SELECT "createdAt", "email", "id", "name", "nickname", "password" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
CREATE TABLE "new_arena" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fantasyName" TEXT NOT NULL,
    "corporateName" TEXT,
    "cnpj" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "logo" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_arena" ("address", "cnpj", "corporateName", "createdAt", "fantasyName", "id", "phone") SELECT "address", "cnpj", "corporateName", "createdAt", "fantasyName", "id", "phone" FROM "arena";
DROP TABLE "arena";
ALTER TABLE "new_arena" RENAME TO "arena";
CREATE UNIQUE INDEX "arena_corporateName_key" ON "arena"("corporateName");
CREATE UNIQUE INDEX "arena_cnpj_key" ON "arena"("cnpj");
CREATE UNIQUE INDEX "arena_phone_key" ON "arena"("phone");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
