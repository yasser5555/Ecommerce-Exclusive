USE ecommerce;

-- Remove old procedure if it already exists
DROP PROCEDURE IF EXISTS add_user_card;

-- Adding a new User Card
DELIMITER //

CREATE PROCEDURE add_user_card(
    IN p_user_id INT,
    IN p_card_type ENUM('Visa', 'Mastercard', 'American Express'),
    IN p_bank_name VARCHAR(100),
    IN p_last4 CHAR(4),
    IN p_expiry_day TINYINT,
    IN p_expiry_month TINYINT,
    IN p_expiry_year SMALLINT,
    IN p_balance DECIMAL(12, 2)
)
BEGIN
    INSERT INTO credit_card (
        user_id,
        card_type,
        bank_name,
        last4,
        balance,
        expiry_day,
        expiry_month,
        expiry_year
    )
    VALUES (
        p_user_id,
        p_card_type,
        p_bank_name,
        p_last4,
        p_balance,
        p_expiry_day,
        p_expiry_month,
        p_expiry_year
    );
END //

DELIMITER ;


-- Test Procedure
CALL add_user_card(18,'Mastercard','CIB','1453',18,8,2042,5600.00);

-- DELETE FROM credit_card WHERE user_id = ? ORDER BY id DESC LIMIT 1;



-- Check Procedure
SHOW PROCEDURE STATUS WHERE Db = 'ecommerce';





DELETE FROM credit_card WHERE user_id = ? ORDER BY id DESC LIMIT 1;
