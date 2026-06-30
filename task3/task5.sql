WITH DuplicateCTE AS (
    SELECT id,
           ROW_NUMBER() OVER (PARTITION BY duplicate_column_1, duplicate_column_2 ORDER BY id) AS rn
    FROM my_table
)
DELETE FROM my_table
WHERE id IN (
    SELECT id 
    FROM DuplicateCTE 
    WHERE rn > 1
);
