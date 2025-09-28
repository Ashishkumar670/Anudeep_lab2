CREATE DATABASE IF NOT EXISTS shoe_store;
USE shoe_store;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role ENUM('user','admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  brand VARCHAR(100),
  sku VARCHAR(100),
  price DECIMAL(10,2),
  size_options VARCHAR(255),
  stock INT,
  image_url VARCHAR(1000),
  image_alt VARCHAR(255),
  image_description TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total DECIMAL(12,2),
  shipping_address TEXT,
  status ENUM('pending','paid','shipped','cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  qty INT,
  price DECIMAL(10,2),
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

-- NOTE: Replace the password hash below with a real bcrypt hash for your admin password.
INSERT INTO users (name,email,password,role) VALUES ('Admin','admin@shoestore.local','$2b$10$PLACEHOLDER_HASH_REPLACE_WITH_BCRYPT','admin');

INSERT INTO products (title,brand,sku,price,size_options,stock,image_url,image_alt,image_description,description) VALUES
('Swift Run','Fleet','FL-SW-001',79.99,'6,7,8,9,10,11',50,'https://images.unsplash.com/photo-1528701800489-476a7d9a6a8e?w=800','Black Swift Run shoe - side view','Black Swift Run shoe with mesh upper. Shown in size 9.','Lightweight breathable running shoe, suitable for daily jogs.'),
('HighTop Classic','Stride','ST-HT-002',99.99,'7,8,9,10,11,12',30,'https://images.unsplash.com/photo-1600180758890-2f8c3e9f8d6a?w=800','White HighTop Classic - front','Classic high-top sneaker with rubber sole.','Timeless style with cushioned ankle support.'),
('Trail Blaze','Terra','TR-TB-003',89.50,'8,9,10,11',20,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800','Trail Blaze hiking shoe - side','Rugged hiking shoe with deep tread.','Designed for off-road trails with reinforced toe.'),
('RunLite','Zooma','ZM-RL-004',69.99,'6,7,8,9,10',80,'https://images.unsplash.com/photo-1519744792095-2f2205e87b6f?w=800','RunLite lightweight shoe - angled','Minimalist running shoe emphasizing light weight.','Perfect for tempo runs.'),
('CourtPro','Ace','AC-CP-005',119.00,'7,8,9,10,11',25,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800','CourtPro tennis shoe - top view','Durable tennis shoe with lateral support.','Made for quick court movements.'),
('UrbanFlex','Metro','MT-UF-006',84.75,'6,7,8,9,10,11,12',60,'https://images.unsplash.com/photo-1520975915080-5f7f6d9d3fbb?w=800','UrbanFlex casual sneaker - side','Stylish casual sneaker for everyday wear.','Comfortable sole with breathable upper.');