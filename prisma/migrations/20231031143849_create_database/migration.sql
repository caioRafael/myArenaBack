-- CreateTable
CREATE TABLE "arena" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fantasyName" TEXT NOT NULL,
    "corporateName" TEXT,
    "cnpj" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "administratorId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "arena_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

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
    "endHour" DATETIME NOT NULL,
    "amountHours" INTEGER NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientPhone" TEXT NOT NULL,
    "sport" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    CONSTRAINT "shcedule_time_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "arena_corporateName_key" ON "arena"("corporateName");

-- CreateIndex
CREATE UNIQUE INDEX "arena_cnpj_key" ON "arena"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "arena_phone_key" ON "arena"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "arena_administratorId_key" ON "arena"("administratorId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
