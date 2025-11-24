use library_db;

DELIMITER $$
CREATE TRIGGER trg_after_borrow_insert
AFTER INSERT ON Borrowing
FOR EACH ROW
BEGIN
    UPDATE Books
    SET Available_Copies = Available_Copies - 1
    WHERE BookID = NEW.BookID;
END$$

CREATE TRIGGER trg_after_borrow_update
AFTER UPDATE ON Borrowing
FOR EACH ROW
BEGIN
    IF NEW.ReturnDate IS NOT NULL AND OLD.ReturnDate IS NULL THEN
        UPDATE Books
        SET Available_Copies = Available_Copies + 1
        WHERE BookID = NEW.BookID;
    END IF;
END$$

CREATE TRIGGER trg_before_borrow_insert
BEFORE INSERT ON Borrowing
FOR EACH ROW
BEGIN
    DECLARE v_available INT;
    SELECT Available_Copies INTO v_available
    FROM Books WHERE BookID = NEW.BookID;

    IF v_available <= 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'No available copies to borrow';
    END IF;
END$$

CREATE TRIGGER trg_reservation_expire
BEFORE UPDATE ON Reservation
FOR EACH ROW
BEGIN
    IF NEW.ReservationExpiryDate < CURDATE() THEN
        SET NEW.Status = 'Expired';
    END IF;
END$$


CREATE PROCEDURE RegisterUser(
    IN p_FirstName VARCHAR(255),
    IN p_LastName VARCHAR(255),
    IN p_BirthDate DATE,
    IN p_UserName VARCHAR(255),
    IN p_Password VARCHAR(255),
    IN p_Role ENUM('admin','customer')
)
BEGIN
    INSERT INTO Users (UserFirstName, UserLastName, UserBirthDate, UserName, UserPassword, UserRole)
    VALUES (p_FirstName, p_LastName, p_BirthDate, p_UserName, p_Password, p_Role);
END$$

CREATE PROCEDURE BorrowBook(
    IN p_BookID INT,
    IN p_UserID INT
)
BEGIN
    INSERT INTO Borrowing (BookID, CusID, BorrowDate, DueDate, Status)
    VALUES (p_BookID, p_UserID, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 14 DAY), 'Borrowed');
END$$

CREATE PROCEDURE ReturnBook(
    IN p_BorrowID INT
)
BEGIN
    DECLARE v_DueDate DATE;
    DECLARE v_Fine DECIMAL(10,2);

    SELECT DueDate INTO v_DueDate FROM Borrowing WHERE BorrowID = p_BorrowID;

    SET v_Fine = GREATEST(DATEDIFF(CURDATE(), v_DueDate) * 5, 0);

    UPDATE Borrowing
    SET ReturnDate = CURDATE(), Status = 'Returned'
    WHERE BorrowID = p_BorrowID;

    INSERT INTO Invoice (BorrowID, Amount, Fine, PaymentDate, Status)
    VALUES (p_BorrowID, 0, v_Fine, CURDATE(), 'Pending');
END$$


CREATE PROCEDURE ReserveBook(
    IN p_BookID INT,
    IN p_UserID INT
)
BEGIN
    INSERT INTO Reservation (BookID, CusID, ReservationDate, ReservationExpiryDate, Status)
    VALUES (p_BookID, p_UserID, CURDATE(), DATE_ADD(CURDATE(), INTERVAL 3 DAY), 'Active');
END$$

CREATE PROCEDURE PayInvoice(
    IN p_InvoiceID INT
)
BEGIN
    UPDATE Invoice
    SET Status = 'Paid', PaymentDate = CURDATE()
    WHERE InvoiceID = p_InvoiceID;
END$$

