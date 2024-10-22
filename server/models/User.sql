CREATE TABLE Users (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,  
    email VARCHAR(255) NOT NULL UNIQUE,      
    password VARCHAR(255) NOT NULL,          
    isAdmin BOOLEAN DEFAULT FALSE            
);