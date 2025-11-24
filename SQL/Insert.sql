-- 7. DUMMY DATA (For Testing)
-- =======================================================================================
USE library_db;

-- Insert Admin Login
INSERT INTO Login (Username, Login_Password, Entity_Type) VALUES ('admin', 'admin123', 'Admin');
INSERT INTO Admin (Ad_FirstName, Ad_LastName, Login_ID) VALUES ('Super', 'Admin', 1);

-- Insert Books
INSERT INTO Books (Title, Author, Quantity, Available_Copies, Price, Category) VALUES 
('The Great Gatsby', 'F. Scott Fitzgerald', 5, 5, 10.00, 'Classic'),
('Clean Code', 'Robert Martin', 3, 3, 45.00, 'Tech'),
('Introduction to SQL', 'John Doe', 2, 2, 30.00, 'Education');

-- Register a Customer via Procedure
CALL RegisterMember('john_doe', 'pass123', 'John', 'Doe', 'john@example.com');

LOAD DATA INFILE 'Path-to-CSV'
INTO TABLE books
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS
(Category, Title, Author, Price, Quantity, Available_Copies, Pub_Year, Pub_Name, Cover, Rating, Availability);
