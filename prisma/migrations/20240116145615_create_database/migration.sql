-- CreateTable
CREATE TABLE "arena" (
    "id" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "corporateName" TEXT,
    "cnpj" TEXT,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "logo" TEXT,
    "pixKey" TEXT,
    "requirePrePayment" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "arena_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "avatar" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "arenaId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fields" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "openIn" DOUBLE PRECISION NOT NULL,
    "closeIn" DOUBLE PRECISION NOT NULL,
    "sports" TEXT NOT NULL,
    "arenaId" TEXT NOT NULL,

    CONSTRAINT "fields_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shcedule_time" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "hour" DOUBLE PRECISION NOT NULL,
    "endHour" DOUBLE PRECISION NOT NULL,
    "amountHours" INTEGER NOT NULL,
    "sport" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,

    CONSTRAINT "shcedule_time_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "arena_corporateName_key" ON "arena"("corporateName");

-- CreateIndex
CREATE UNIQUE INDEX "arena_cnpj_key" ON "arena"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "arena_phone_key" ON "arena"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "shcedule_time_userId_key" ON "shcedule_time"("userId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_arenaId_fkey" FOREIGN KEY ("arenaId") REFERENCES "arena"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fields" ADD CONSTRAINT "fields_arenaId_fkey" FOREIGN KEY ("arenaId") REFERENCES "arena"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shcedule_time" ADD CONSTRAINT "shcedule_time_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shcedule_time" ADD CONSTRAINT "shcedule_time_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "fields"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
