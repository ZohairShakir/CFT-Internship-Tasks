WITH RegionalSales AS (
    SELECT r.region_name, SUM(s.amount) AS total_sales
    FROM sales s
    JOIN regions r ON s.region_id = r.region_id
    GROUP BY r.region_name
)
SELECT region_name, total_sales
FROM RegionalSales;
