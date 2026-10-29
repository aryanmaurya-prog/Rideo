UPDATE "User"
SET
    "email" = CASE
        WHEN "phone" = '9876543210'
            AND NOT EXISTS (SELECT 1 FROM "User" WHERE "email" = 'admin@rideo.in')
            THEN 'admin@rideo.in'
        ELSE 'legacy-' || "id" || '@rideo.invalid'
    END,
    "phone" = CASE
        WHEN "phone" = '9876543210'
            AND EXISTS (SELECT 1 FROM "User" WHERE "email" = 'admin@rideo.in')
            THEN NULL
        ELSE "phone"
    END
WHERE "email" IS NULL;

ALTER TABLE "User"
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "email" SET NOT NULL;
