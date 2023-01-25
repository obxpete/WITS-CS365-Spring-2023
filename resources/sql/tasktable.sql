-- SQLite



CREATE TABLE  IF NOT EXISTS TASKS (
  ID INTEGER NOT NULL,
  taskName TEXT NOT NULL,
  description TEXT
);

INSERT INTO TASKS (ID, taskName, description) VALUES (1, 'Task 1', 'Description 1');
INSERT INTO TASKS (ID, taskName, description) (ID, taskName, description) VALUES (2, 'Task 2', 'Description 2');
INSERT INTO TASKS (ID, taskName, description) (ID, taskName, description) VALUES (3, 'Task 3', 'Description 3');
INSERT INTO TASKS (ID, taskName, description) (ID, taskName, description) VALUES (4, 'Task 4', 'Description 4');