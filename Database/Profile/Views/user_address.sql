CREATE VIEW user_address AS
SELECT
    user_id,
    country,
    city,
    street_number,
    building_number,
    apartement_number
FROM addresses;
-- Test 
SELECT * FROM user_address WHERE user_id = 19;