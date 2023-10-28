-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "username" VARCHAR(50),

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);
