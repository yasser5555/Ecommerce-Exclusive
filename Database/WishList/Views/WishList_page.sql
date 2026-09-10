-- SELECT
--     *,
--     CASE
--         WHEN wishlist.id IS NOT NULL THEN 1
--         ELSE 0
--     END AS isWishList
-- FROM product_card

-- LEFT JOIN wishlist
--     ON product_card.p_id = wishlist .product_id
--     AND wishlist.user_id = 1;
SELECT product_card.image, product_card.name, product_card.category, product_card.price, product_card.price_after_discount, product_card.stock
FROM product_card
    INNER JOIN wishlist ON product_card.p_id = wishlist.product_id
WHERE
    wishlist.user_id = 1;