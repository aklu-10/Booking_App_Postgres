CREATE TABLE Room (
    room_id VARCHAR(255) PRIMARY KEY,
    gh_id VARCHAR(255) REFERENCES GuestHouse(gh_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    maxPeople INTEGER NOT NULL,
    description TEXT
);