USE ringtounsi;

DROP TABLE IF EXISTS user;

CREATE TABLE
    IF NOT EXISTS user (
        id INT PRIMARY KEY auto_increment,
        nom VARCHAR(50) NOT NULL,
        prenom VARCHAR(50) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password CHAR(60) NOT NULL,
        date_inscription datetime NOT NULL,
        role ENUM('Admin', 'Coach', 'Athlete') DEFAULT 'Athlete'
    );