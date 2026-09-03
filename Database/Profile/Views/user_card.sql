CREATE VIEW user_card AS
SELECT
    user_id,
    card_type,
    bank_name,
    last4,
    balance,
    expiry_day,
    expiry_month,
    expiry_year
FROM credit_card;
-- Test
SELECT * FROM user_card WHERE user_id = 2;