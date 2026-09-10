DELIMITER / /
CREATE PROCEDURE get_product_by_id(
    IN p_product_id INT,
    IN p_user_id INT
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

    WHERE product_card.p_id = p_product_id;

END //
DELIMITER;
-- call get_product_by_id(1,1)
