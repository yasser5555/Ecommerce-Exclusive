CREATE OR REPLACE VIEW user_cart_items AS
SELECT
    product_card.p_id as product_id,
    product_card.name,
    cart_items.id as cart_id,
    cart_items.user_id as user_cart_id,
    product_card.image,
    product_card.price,
    cart_items.quantity,
    (quantity * price) as sub_total
FROM product_card
    INNER JOIN cart_items on product_card.p_id = cart_items.product_id WHERE stock > 0;