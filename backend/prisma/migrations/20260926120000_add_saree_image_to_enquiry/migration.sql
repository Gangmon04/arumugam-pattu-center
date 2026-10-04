-- AlterTable
ALTER TABLE "Enquiry" ADD COLUMN "sareeImageUrl" TEXT;
ALTER TABLE "Enquiry" ADD COLUMN "pickupTime" TEXT;
ALTER TABLE "Enquiry" ADD COLUMN "coords" TEXT;
ALTER TABLE "Enquiry" ALTER COLUMN "numberOfSarees" SET DEFAULT 1;
ALTER TABLE "Enquiry" ALTER COLUMN "pickupRequired" SET DEFAULT true;
