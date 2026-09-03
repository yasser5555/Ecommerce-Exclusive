USE ecommerce;
SELECT 
    users.first_name,
    users.last_name,
    orders.total_price,
    users.phone_number,
    addresses.street_number,
    addresses.building_number,
    addresses.apartement_number
FROM
    users
        INNER JOIN
    orders ON users.id = orders.user_id
        INNER JOIN
    addresses ON users.id = addresses.user_id
WHERE
    users.id = 8;

-- Admin Orders List
SELECT 
    users.first_name,
    users.last_name,
    orders.total_price,
    users.phone_number,
    products.title,
    order_items.quantity,
    addresses.country,
    addresses.city,
    addresses.street_number,
    addresses.building_number,
    addresses.apartement_number
FROM
    users
        INNER JOIN
    orders ON users.id = orders.user_id
        INNER JOIN
    order_items ON orders.id = order_items.order_id
        INNER JOIN
    products ON order_items.product_id = products.id
        INNER JOIN
    addresses ON users.id = addresses.user_id;
    
-- User-Orders
SELECT 
    products.title,
    order_items.quantity,
    orders.total_price,
    orders.status
FROM
    users
        INNER JOIN
    orders ON users.id = orders.user_id
        INNER JOIN
    order_items ON order_items.order_id = orders.id
        INNER JOIN
    products ON order_items.product_id = products.id

    

    
