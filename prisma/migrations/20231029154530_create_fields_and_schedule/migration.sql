-- CreateTable
CREATE TABLE "fields" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "openIn" DATETIME NOT NULL,
    "closeIn" DATETIME NOT NULL,
    "sports" TEXT NOT NULL,
    "arenaId" TEXT NOT NULL,
    CONSTRAINT "fields_arenaId_fkey" FOREIGN KEY ("arenaId") REFERENCES "arena" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "shcedule_time" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "hour" DATETIME NOT NULL,
    "amountHours" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    CONSTRAINT "shcedule_time_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
