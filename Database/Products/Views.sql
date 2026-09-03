CREATE view catogeries_count as
select products.title, categories.name, categories.id
from products
    inner join categories on products.category_id = categories.id;

-- drop View if EXISTS catogeries_count;
