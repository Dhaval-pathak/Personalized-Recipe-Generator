-- AlterTable
ALTER TABLE "User" ADD COLUMN     "name" TEXT,
ADD COLUMN     "oauthProvider" TEXT,
ALTER COLUMN "password" DROP NOT NULL;
