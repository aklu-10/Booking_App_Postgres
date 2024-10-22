CREATE TABLE RoomNumber (
    room_number_id VARCHAR(255) PRIMARY KEY,
    room_id VARCHAR(255) REFERENCES Room(room_id) ON DELETE CASCADE,
    number INTEGER NOT NULL,
    unavailable_dates DATE[]
);