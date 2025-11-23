-- 4. AUTOMATION TRIGGERS (The Logic Layer)
-- =======================================================================================

DELIMITER $$

-- Trigger 1: Auto-Decrease Inventory when Book is Borrowed
CREATE TRIGGER after_borrow_insert
AFTER INSERT ON Borrowing
FOR EACH ROW
BEGIN
    UPDATE Books 
    SET Available_Copies = Available_Copies - 1,
        Availability = IF(Available_Copies - 1 > 0, TRUE, FALSE)
    WHERE BookID = NEW.BookID;
END$$

-- Trigger 2: Auto-Increase Inventory when Book is Returned
CREATE TRIGGER after_borrow_update
AFTER UPDATE ON Borrowing
FOR EACH ROW
BEGIN
    IF NEW.Status = 'Returned' AND OLD.Status != 'Returned' THEN
        UPDATE Books 
        SET Available_Copies = Available_Copies + 1,
            Availability = TRUE
        WHERE BookID = NEW.BookID;
    END IF;
END$$

-- Trigger 3: Auto-Calculate Book Rating
CREATE TRIGGER after_rating_insert
AFTER INSERT ON Cus_Rating
FOR EACH ROW
BEGIN
    UPDATE Books
    SET Rating = (SELECT AVG(Rating) FROM Cus_Rating WHERE BookID = NEW.BookID)
    WHERE BookID = NEW.BookID;
END$$

DELIMITER ;

-- =======================================================================================
-- 5. STORED PROCEDURES (Complex Business Logic)
-- =======================================================================================

DELIMITER $$

-- Procedure: RETURN BOOK & CALCULATE FINE
-- Objective: Automatically calculate fines for late returns
-- Usage: CALL ReturnBook(101); -- Where 101 is BorrowID
CREATE PROCEDURE ReturnBook(IN p_BorrowID INT)
BEGIN
    DECLARE v_DueDate DATETIME;
    DECLARE v_Penalty DECIMAL(10,2) DEFAULT 20.00; -- Fixed penalty amount
    
    -- 1. Get the Due Date
    SELECT DueDate INTO v_DueDate FROM Borrowing WHERE BorrowID = p_BorrowID;
    
    -- 2. Update Borrowing Table
    UPDATE Borrowing 
    SET ReturnDate = NOW(), 
        Status = 'Returned'
    WHERE BorrowID = p_BorrowID;
    
    -- 3. Check for Late Return & Update Invoice
    IF NOW() > v_DueDate THEN
        UPDATE Invoice 
        SET Fine = v_Penalty, 
            Status = 'Unpaid' 
        WHERE BorrowID = p_BorrowID;
    END IF;
END$$

-- Procedure: REGISTER NEW MEMBER
-- Objective: Handle atomic insert into Login and Customer tables
CREATE PROCEDURE RegisterMember(
    IN p_Username VARCHAR(255), 
    IN p_Password VARCHAR(255), 
    IN p_FirstName VARCHAR(255), 
    IN p_LastName VARCHAR(255), 
    IN p_Email VARCHAR(255)
)
BEGIN
    DECLARE v_LoginID INT;
    
    START TRANSACTION;
    
    -- Insert into Login
    INSERT INTO Login (Username, Login_Password, Entity_Type) 
    VALUES (p_Username, p_Password, 'Customer');
    
    SET v_LoginID = LAST_INSERT_ID();
    
    -- Insert into Customer
    INSERT INTO Customer (Cus_FirstName, Cus_LastName, Email, Login_ID) 
    VALUES (p_FirstName, p_LastName, p_Email, v_LoginID);
    
    COMMIT;
END$$

DELIMITER ;

-- =======================================================================================
-- 6. REPORT VIEWS (For Admin Dashboard)
-- =======================================================================================

-- View 1: Overdue Books Report
-- Objective: Provide reports on member activity and fines
CREATE VIEW View_Overdue_Report AS
SELECT 
    b.Title,
    c.Cus_FirstName,
    c.Cus_LastName,
    br.DueDate,
    DATEDIFF(NOW(), br.DueDate) as Days_Overdue,
    i.Fine
FROM Borrowing br
JOIN Books b ON br.BookID = b.BookID
JOIN Customer c ON br.CusID = c.CusID
JOIN Invoice i ON br.BorrowID = i.BorrowID
WHERE br.Status = 'Overdue' OR (br.Status = 'Borrowed' AND NOW() > br.DueDate);

-- View 2: Most Popular Books
-- Objective: Generate reports on most borrowed books
CREATE VIEW View_Popular_Books AS
SELECT 
    b.Title,
    b.Author,
    COUNT(br.BorrowID) as Times_Borrowed,
    b.Rating
FROM Books b
LEFT JOIN Borrowing br ON b.BookID = br.BookID
GROUP BY b.BookID
ORDER BY Times_Borrowed DESC;
