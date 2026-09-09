select * from product_reviews;

SELECT * from users;

CREATE VIEW IF NOT EXISTS Product_comments as select
    users.id as user_id,
    product_reviews.id as review_id,
    product_reviews.product_id,
    users.avatar,
    users.email,
    product_reviews.COMMENT,
    product_reviews.rating,
    product_reviews.commented_at
from users
    INNER JOIN product_reviews on users.id = product_reviews.user_id
ORDER BY commented_at DESC;
SELECT * FROM product_comments where product_id = 1;
drop view if EXISTS Product_comments;