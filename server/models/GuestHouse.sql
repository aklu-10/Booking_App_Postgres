CREATE TABLE GuestHouse (
    gh_id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,          
    city VARCHAR(255) NOT NULL,         
    address VARCHAR(255) NOT NULL,       
    distance DECIMAL(10, 2),             
    photos TEXT[],                       
    description TEXT,                    
    rating FLOAT CHECK (rating >= 0 AND rating <= 5),  
    rooms TEXT[],                         
    cheapest_price DECIMAL(10, 2),       
    featured BOOLEAN DEFAULT FALSE       
);