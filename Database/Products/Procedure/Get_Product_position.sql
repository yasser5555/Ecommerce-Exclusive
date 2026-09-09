CREATE PROCEDURE get_Product_Postion(IN p_id INT)
BEGIN
SELECT COUNT(*) + 1 AS position
FROM products AS p
WHERE 
    p.created_at < (
        SELECT created_at
        FROM products
        WHERE id = p_id
    )
    OR (
        p.created_at = (
            SELECT created_at
            FROM products
            WHERE id = p_id
        )
        AND p.id < p_id
    );
END //

call get_Product_Postion(60);