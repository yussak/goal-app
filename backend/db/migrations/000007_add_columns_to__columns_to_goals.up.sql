ALTER TABLE goals
ADD COLUMN smart_specific varchar(50) NOT NULL,
ADD COLUMN smart_measurable varchar(50) NOT NULL,
ADD COLUMN smart_achievable varchar(50) NOT NULL,
ADD COLUMN smart_relevant varchar(50) NOT NULL,
ADD COLUMN smart_time_bound varchar(50) NOT NULL,
ADD COLUMN purpose varchar(50) NOT NULL,
ADD COLUMN loss varchar(50),
ADD COLUMN phase varchar(10) NOT NULL,
ADD COLUMN progress TINYINT  NOT NULL;
