-- Notes:
-- Views can't be used for inserting data
-- it's just used to display data only no logic applied on it
DESCRIBE cart_items;
-- Views Components: product_card.prodcut-image , product_card.product-title , product_card.price , cart_items ,
DESCRIBE order_items;
-- this used for Contain order_items
DESCRIBE orders;
-- this used in for buying operation
-- SELECT * FROM cart_items where user_id = 1;
INSERT INTO
    cart_items
values
    id,
    user_id,
    product_id,
    quantity (3, 1, 1, 11);

INSERT INTO cart_items values (4, 1, 1, 45);

UPDATE cart_items SET cart_items.quantity = quantity + 1 where user_id = 1;
UPDATE cart_items SET cart_items.quantity = quantity - 1 where user_id = 1;


CREATE OR REPLACE VIEW user_cart_items AS
SELECT
    product_card.p_id as product_id,
    cart_items.id as cart_id,
    cart_items.user_id as user_cart_id,
    product_card.image,
    product_card.price,
    cart_items.quantity,
    (quantity * price) as sub_total
FROM product_card
    INNER JOIN cart_items on product_card.p_id = cart_items.product_id;


SELECT * from cart_items WHERE user_id =  1 ;
SELECT * from user_cart_items WHERE user_cart_id = 1 ;

INSERT INTO
    cart_items (user_id, product_id, quantity)
VALUES (1, 1, 2),
    (2, 3, 1),
    (3, 5, 4),
    (4, 7, 2),
    (5, 2, 1),
    (6, 9, 3),
    (7, 4, 2),
    (8, 6, 5),
    (9, 8, 1),
    (10, 10, 3);

-- ! For Reading user_cart_items
-- SELECT * FROM user_cart_items WHERE user_cart_id = ?;
-- ! For Adding into cart
-- INSERT INTO cart_items id , user_id , product_id , quantity  values(?,?,?,?);
-- ! For Modifying
-- UPDATE cart_items SET cart_items.quantity = quantity + ? where user_id = ? ;
-- UPDATE cart_items SET cart_items.quantity = quantity - ? where user_id = ?;
-- ! For Deleting items from Cart
-- DELETE from cart_items WHERE user_id = 1;