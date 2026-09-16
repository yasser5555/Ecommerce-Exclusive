CREATE OR REPLACE VIEW user_address AS
SELECT
addresses.id as address_id,
    user_id,
    country,
    city,
    street_number,
    building_number,
    apartement_number
FROM addresses;
-- Test 
SELECT * FROM user_address WHERE user_id = 19;