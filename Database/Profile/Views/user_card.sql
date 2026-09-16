CREATE or REPLACE VIEW user_card AS
SELECT
    credit_card.id as card_id,
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

SELECT * FROM credit_card;