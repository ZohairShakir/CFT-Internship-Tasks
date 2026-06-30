WITH RankedOrders AS (
    SELECT order_id, user_id, order_date, total_amount,
           ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY order_date DESC) AS rn
    FROM orders
)
SELECT u.user_id, u.username, ro.order_id, ro.order_date, ro.total_amount
FROM users u
LEFT JOIN RankedOrders ro ON u.user_id = ro.user_id AND ro.rn = 1;
