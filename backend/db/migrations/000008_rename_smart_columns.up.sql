ALTER TABLE goals
RENAME COLUMN `smart_specific` TO `specific`,
RENAME COLUMN `smart_measurable` TO `measurable`,
RENAME COLUMN `smart_achievable` TO `achievable`,
RENAME COLUMN `smart_relevant` TO `relevant`,
RENAME COLUMN `smart_time_bound` TO `time_bound`;
