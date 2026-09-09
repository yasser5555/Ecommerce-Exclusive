-- SELECT * from  product_card WHERE category =  ? and rating > ? or price BETWEEN ? and ? ORDER BY price
DROP PROCEDURE if EXISTS filter_Product;

DELIMITER / /

CREATE PROCEDURE filter_Product(
    IN p_catogery VARCHAR(120),
    IN p_rating FLOAT,
    IN p_min_price FLOAT,
    IN p_max_price FLOAT
)
BEGIN

    SELECT *
    FROM product_card
    WHERE
        (p_catogery IS NULL OR category = p_catogery)
        
        AND
        
        (p_rating IS NULL OR rating >= p_rating)
        
        AND
        
        (p_min_price IS NULL OR price >= p_min_price)AND
        (p_max_price IS NULL OR price <= p_max_price)

    ORDER BY price;

END //

DELIMITER;

CALL filter_Product ("electronics", 4,NULL ,NULL  )