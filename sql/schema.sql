-- Create the database
CREATE DATABASE IF NOT EXISTS school_db;
USE school_db;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample seed data (optional)
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Delhi Public School', 'Sector 45, Noida, UP', 28.5706, 77.3219),
('Kendriya Vidyalaya', 'MG Road, Bengaluru, KA', 12.9716, 77.5946),
('Ryan International', 'Andheri West, Mumbai, MH', 19.1136, 72.8697),
('St. Xavier High School', 'Park Street, Kolkata, WB', 22.5726, 88.3639),
('The Doon School', 'Mall Road, Dehradun, UK', 30.3165, 78.0322);
