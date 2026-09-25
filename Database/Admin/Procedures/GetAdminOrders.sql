DELIMITER $$

CREATE PROCEDURE GetAdminOrderStatistics()
BEGIN
    SELECT 
        COUNT(*) AS total_orders
    FROM orders;

    SELECT 
        COUNT(*) AS pending_orders
    FROM orders
    WHERE status = 'pending';

    SELECT 
        COUNT(*) AS delivered_orders
    FROM orders
    WHERE status = 'delivered';

    SELECT 
        COALESCE(SUM(total_price), 0) AS total_revenue
    FROM orders;

    SELECT 
        orders.id,
        users.first_name,
        users.last_name,
        orders.created_at,
        orders.total_price,
        orders.status
    FROM orders
    INNER JOIN users
        ON orders.user_id = users.id
    ORDER BY RAND();

END $$

DELIMITER;
call GetAdminOrderStatistics();