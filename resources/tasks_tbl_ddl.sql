USE witsExamples;

GO

IF EXISTS(SELECT * FROM sys.tables WHERE SCHEMA_NAME(schema_id) LIKE 'dbo' AND name like 'tasks')  
   DROP TABLE [dbo].[tasks];  
GO

CREATE TABLE tasks (
    taskID  INT IDENTITY(1,1) PRIMARY KEY,
    task varchar(255),
    taskDueDate varchar(255)
);



INSERT INTO tasks (task,taskDueDate)
VALUES ('Put oil in Lichhers', getDate()), ('Clear and set diningroom table', getDate()), ('Bake Challah', getDate()), ('Set clean sheets for guests.', getDate()), ('Put up the blech', getDate()), ('Turn off all electronics', getDate());

select taskID, task, taskDueDate from tasks