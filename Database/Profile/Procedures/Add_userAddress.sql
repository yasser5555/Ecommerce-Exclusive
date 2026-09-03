use ecommerce;


-- Adding a new User address
DELIMITER //

CREATE PROCEDURE add_user_address(
  IN   p_user_id INT ,
  IN   p_country VARCHAR(50) ,
  IN   p_city VARCHAR(100) ,
  IN   p_street_number VARCHAR(100) ,
  IN  p_building_number VARCHAR(100) ,
  IN p_apartement_number VARCHAR(100) 
)
BEGIN
    INSERT INTO addresses (
  user_id,
        country,
        city,
        street_number,
        building_number,
        apartement_number
    )
    VALUES (
        p_user_id,
        p_country,
        p_city,
        p_street_number,
        p_building_number,
        p_apartement_number
    );
END //

DELIMITER ;
CALL add_user_address(18,"Egypt","Portsaid","Elsabah-District",42,9);


select * from addresses;


DELETE FROM addresses WHERE user_id = 18 ORDER BY user_id DESC LIMIT 1;

select * from user_address where user_id = 18;

-- Check Procedure
SHOW PROCEDURE STATUS WHERE Db = 'ecommerce';

SHOW CREATE TABLE orders;