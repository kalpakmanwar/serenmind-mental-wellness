-- ================================================
-- 🔧 FIX FLYWAY CHECKSUM MISMATCH
-- ================================================
-- Run this in MySQL Workbench to fix the error
-- ================================================

USE serenmind_db;

-- Update the checksum for migration V2
UPDATE flyway_schema_history 
SET checksum = -1748013652 
WHERE version = '2';

-- Verify the update
SELECT version, description, checksum, installed_on 
FROM flyway_schema_history 
ORDER BY installed_rank;

-- ================================================
-- ✅ DONE! Now restart the backend
-- ================================================

