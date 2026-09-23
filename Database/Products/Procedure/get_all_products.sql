DELIMITER /
/
DROP PROCEDURE if EXISTS get_all_products;
DROP PROCEDURE IF EXISTS get_all_products;

DELIMITER //
CREATE PROCEDURE get_all_products(
    IN p_user_id INT,
    IN p_limit INT,
    IN p_offset INT
)
BEGIN

    SELECT
        product_card.*,
        CASE
            WHEN wishlist.id IS NOT NULL THEN 1
            ELSE 0
        END AS isWishList

    FROM product_card

    LEFT JOIN wishlist
        ON wishlist.product_id = product_card.p_id
        AND wishlist.user_id = p_user_id

    ORDER BY RAND()

    LIMIT p_offset, p_limit;

END //

DELIMITER ;

DELIMITER;

CALL get_all_products (1, 10, 10)