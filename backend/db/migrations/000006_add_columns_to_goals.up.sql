ALTER TABLE goals
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;