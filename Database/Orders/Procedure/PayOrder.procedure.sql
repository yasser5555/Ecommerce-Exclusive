DELIMITER //

CREATE OR REPLACE PROCEDURE PayOrder(
    IN p_order_id INT,
    IN p_user_id INT,
    IN p_card_id INT
)
BEGIN
    UPDATE credit_card
    INNER JOIN user_order
        ON user_order.user_id = credit_card.user_id
    SET
        credit_card.balance =
            credit_card.balance - user_order.total_sum
    WHERE
        user_order.order_id = p_order_id
        AND credit_card.user_id = p_user_id
        AND user_order.user_id = p_user_id
        AND credit_card.id = p_card_id;

END //

DELIMITER ;