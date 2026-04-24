-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CARD', 'TRANSFER', 'CASH');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CARD';
