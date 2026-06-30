# Task 3: SQL Queries

This folder contains standard SQL queries corresponding to the following tasks:

1. **Top 5 Highest-Paid Employees** ([task1.sql](file:///c:/Users/zohai/Desktop/task%202/task3/task1.sql))
   - Finds the top 5 highest-paid employees from an `Employees` table using `ORDER BY` and `LIMIT`.

2. **Users with More Than 3 Orders** ([task2.sql](file:///c:/Users/zohai/Desktop/task%202/task3/task2.sql))
   - Lists users who have placed more than 3 orders using `GROUP BY` and a `HAVING` clause.

3. **Total Sales Per Region using CTE** ([task3.sql](file:///c:/Users/zohai/Desktop/task%202/task3/task3.sql))
   - Uses a Common Table Expression (CTE) to calculate and retrieve the aggregated sales figures per region.

4. **Users with Their Latest Orders** ([task4.sql](file:///c:/Users/zohai/Desktop/task%202/task3/task4.sql))
   - Uses a `LEFT JOIN` combined with a windowing query (`ROW_NUMBER()`) to get users alongside their most recent order record.

5. **Deduplicate Records** ([task5.sql](file:///c:/Users/zohai/Desktop/task%202/task3/task5.sql))
   - Uses `ROW_NUMBER()` partitioning to identify duplicate rows and delete the non-primary duplicates.
