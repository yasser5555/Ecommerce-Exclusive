-- ! Get Random Products for Carousel
SELECT *
FROM product_card
ORDER BY RAND()
LIMIT 4;
-- ! For Catogeries Section
SELECT * from categories;
SELECT * FROM product_card WHERE category = "electronics";
-- ! For Best Selling
SELECT * from product_card WHERE rating > 3;
