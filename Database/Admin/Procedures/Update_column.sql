DELIMITER / /

CREATE OR REPLACE PROCEDURE update_product(
    p_column VARCHAR(30),
    p_value VARCHAR(120),
    p_id INT
)
BEGIN
    SET @sql = CONCAT(
        'UPDATE products SET ',
        p_column,
        ' = ? WHERE id = ?'
    );
    PREPARE stmt FROM @sql;
    SET @value = p_value;
    SET @product_id = p_id;
    EXECUTE stmt USING @value, @product_id;
    DEALLOCATE PREPARE stmt;

END //

DELIMITER;
--  SELECT stock FROM products WHERE id = 50
 call update_product("stock" , 1220 ,50 );