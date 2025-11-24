
DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;
USE library_db;

-- =======================================================================================
-- 1. CORE TABLES (User Management & Catalog)
-- =======================================================================================

-- Create the tables

CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    UserFirstName VARCHAR(255),
    UserLastName VARCHAR(255),
    UserBirthDate DATE,
    UserName VARCHAR(255) UNIQUE,
    UserPassword VARCHAR(255),
    UserRole ENUM('admin', 'customer') NOT NULL
);

CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Category VARCHAR(100),
    Title VARCHAR(255),
    Author VARCHAR(255),
    Price DECIMAL(10,2),
    Quantity INT,
    Available_Copies INT,
    Pub_Year INT,
    Pub_Name VARCHAR(255),
    Cover VARCHAR(255),
    Rating FLOAT,
    Availability BOOLEAN
);

CREATE TABLE Borrowing (
    BorrowID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT NOT NULL,
    CusID INT NOT NULL,
    BorrowDate DATE NOT NULL,
    DueDate DATE NOT NULL,
    ReturnDate DATE,
    Status VARCHAR(50),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (CusID) REFERENCES Users(UserID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Reservation (
    ReservationID INT AUTO_INCREMENT PRIMARY KEY,
    BookID INT NOT NULL,
    CusID INT NOT NULL,
    ReservationDate DATE NOT NULL,
    ReservationExpiryDate DATE,
    Status VARCHAR(50),
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (CusID) REFERENCES Users(UserID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Invoice (
    InvoiceID INT AUTO_INCREMENT PRIMARY KEY,
    BorrowID INT NOT NULL UNIQUE,
    Amount DECIMAL(10,2) NOT NULL,
    Fine DECIMAL(10,2) DEFAULT 0,
    PaymentDate DATE,
    Status VARCHAR(50),
    FOREIGN KEY (BorrowID) REFERENCES Borrowing(BorrowID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE User_Address (
    AdID INT PRIMARY KEY,
    Street_Name VARCHAR(255),
    City VARCHAR(100),
    Country VARCHAR(100),
    Region VARCHAR(100),
    Postal_Code VARCHAR(20),
    FOREIGN KEY (AdID) REFERENCES Users(UserID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE User_Phone (
    AdID INT NOT NULL,
    Phone_Number VARCHAR(20) NOT NULL,
    PRIMARY KEY (AdID, Phone_Number),
    FOREIGN KEY (AdID) REFERENCES Users(UserID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE User_Rating (
    UserID INT NOT NULL,
    BookID INT NOT NULL,
    Rating FLOAT,
    PRIMARY KEY (UserID, BookID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (BookID) REFERENCES Books(BookID)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);