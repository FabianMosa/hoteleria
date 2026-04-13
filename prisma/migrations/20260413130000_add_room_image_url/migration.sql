-- Fotografía opcional por habitación (URL absoluta hacia CDN u origen permitido en next.config).
ALTER TABLE "Room" ADD COLUMN "imageUrl" TEXT;
