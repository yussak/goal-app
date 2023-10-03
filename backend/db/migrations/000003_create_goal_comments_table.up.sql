CREATE TABLE IF NOT EXISTS goal_comments (
    id VARCHAR(26) PRIMARY KEY,
    title VARCHAR(255),
    text TEXT,
    goal_id VARCHAR(26),
    FOREIGN KEY (goal_id) REFERENCES goals(id)
);