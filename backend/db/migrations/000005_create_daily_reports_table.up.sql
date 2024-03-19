CREATE TABLE IF NOT EXISTS daily_reports (
  id varchar(26) NOT NULL PRIMARY KEY,
  user_id varchar(26) NOT NULL,
  report_date DATE NOT NULL,
  content varchar(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY (user_id, report_date)
);