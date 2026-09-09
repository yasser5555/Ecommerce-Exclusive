-- select
--     products.product_image as image,
--     products.title as name,
--     categories.name as Catogery,
--     products.old_price,
--     products.stock,
--     product_reviews.rating
-- from
--     products
--     inner JOIN categories on products.category_id = categories.id
--     INNER JOIN product_reviews on products.id = product_reviews.product_id;



-- Checking Seeding
select * from product_reviews;