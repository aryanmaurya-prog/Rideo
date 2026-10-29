-- Add nullable columns first so existing rows can be backfilled safely.
ALTER TABLE "User"
ADD COLUMN "email" TEXT,
ADD COLUMN "avatarUrl" TEXT,
ADD COLUMN "city" TEXT,
ADD COLUMN "totalRides" INTEGER NOT NULL DEFAULT 0;

CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

ALTER TABLE "Bike"
ADD COLUMN "imageUrl" TEXT,
ADD COLUMN "registrationNumber" TEXT,
ADD COLUMN "year" INTEGER,
ADD COLUMN "engineCc" INTEGER,
ADD COLUMN "mileageKmpl" DECIMAL(5,2),
ADD COLUMN "fuelType" TEXT,
ADD COLUMN "transmission" TEXT,
ADD COLUMN "features" TEXT[],
ADD COLUMN "description" TEXT,
ADD COLUMN "rating" DECIMAL(2,1),
ADD COLUMN "totalRides" INTEGER;

WITH ranked_bikes AS (
    SELECT
        "id",
        CASE "city"
            WHEN 'Bangalore' THEN 'KA-01'
            WHEN 'Mumbai' THEN 'MH-01'
            WHEN 'Pune' THEN 'MH-12'
            WHEN 'Goa' THEN 'GA-01'
            WHEN 'Manali' THEN 'HP-01'
            WHEN 'Rishikesh' THEN 'UK-01'
            WHEN 'Udaipur' THEN 'RJ-01'
            WHEN 'Hyderabad' THEN 'TS-09'
            ELSE 'KA-01'
        END AS registration_prefix,
        ROW_NUMBER() OVER (
            PARTITION BY CASE "city"
                WHEN 'Bangalore' THEN 'KA-01'
                WHEN 'Mumbai' THEN 'MH-01'
                WHEN 'Pune' THEN 'MH-12'
                WHEN 'Goa' THEN 'GA-01'
                WHEN 'Manali' THEN 'HP-01'
                WHEN 'Rishikesh' THEN 'UK-01'
                WHEN 'Udaipur' THEN 'RJ-01'
                WHEN 'Hyderabad' THEN 'TS-09'
                ELSE 'KA-01'
            END
            ORDER BY "id"
        ) AS plate_number
    FROM "Bike"
)
UPDATE "Bike" AS bike
SET
    "imageUrl" = 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1200&q=80',
    "registrationNumber" = ranked_bikes.registration_prefix || '-AB-' || LPAD(ranked_bikes.plate_number::TEXT, 4, '0'),
    "year" = 2024,
    "engineCc" = CASE WHEN LOWER(bike."category") IN ('ev', 'electric') THEN NULL ELSE 150 END,
    "mileageKmpl" = CASE WHEN LOWER(bike."category") IN ('ev', 'electric') THEN NULL ELSE 40.00 END,
    "fuelType" = CASE WHEN LOWER(bike."category") IN ('ev', 'electric') THEN 'electric' ELSE 'petrol' END,
    "transmission" = CASE WHEN LOWER(bike."category") IN ('ev', 'electric', 'scooter') THEN 'automatic' ELSE 'manual' END,
    "features" = CASE
        WHEN LOWER(bike."category") IN ('ev', 'electric')
            THEN ARRAY['Helmet included', 'Fast charging', 'Electric ride']::TEXT[]
        WHEN LOWER(bike."category") = 'scooter'
            THEN ARRAY['Helmet included', 'Under-seat storage', 'Easy city handling']::TEXT[]
        ELSE ARRAY['Helmet included', 'ABS', 'Comfortable ride']::TEXT[]
    END,
    "description" = bike."name" || ' available for rental in ' || bike."city" || '.',
    "rating" = 4.5,
    "totalRides" = 0
FROM ranked_bikes
WHERE bike."id" = ranked_bikes."id";

ALTER TABLE "Bike"
ALTER COLUMN "imageUrl" SET NOT NULL,
ALTER COLUMN "registrationNumber" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL,
ALTER COLUMN "fuelType" SET NOT NULL,
ALTER COLUMN "transmission" SET NOT NULL,
ALTER COLUMN "features" SET NOT NULL,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "totalRides" SET NOT NULL;

CREATE UNIQUE INDEX "Bike_registrationNumber_key" ON "Bike"("registrationNumber");

ALTER TABLE "Booking"
ADD COLUMN "pickupLat" DECIMAL(9,6),
ADD COLUMN "pickupLng" DECIMAL(9,6),
ADD COLUMN "dropLat" DECIMAL(9,6),
ADD COLUMN "dropLng" DECIMAL(9,6),
ADD COLUMN "distanceKm" DECIMAL(65,30),
ADD COLUMN "paymentMethod" TEXT,
ADD COLUMN "paymentStatus" TEXT;
