SELECT * FROM product_reviews WHERE product_id = 7 ORDER BY id DESC;

SELECT * FROM users WHERE id = 454;

SHOW CREATE TABLE product_reviews;

ALTER TABLE product_reviews ADD INDEX idx_user_id (user_id);

ALTER TABLE product_reviews DROP INDEX user_id;

CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE