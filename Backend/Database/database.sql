CREATE DATABASE shoe_eco;


CREATE TABLE customers (
    customer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,  
    phone_number VARCHAR(20),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for brands
CREATE TABLE brands (
    brand_id SERIAL PRIMARY KEY,
    brand_name VARCHAR(255) UNIQUE NOT NULL
);

-- Table for shoes
CREATE TABLE shoes (
    shoe_id SERIAL PRIMARY KEY,
    brand_id INT REFERENCES brands(brand_id) ON DELETE SET NULL,
    model_name VARCHAR(255) NOT NULL,
    size DECIMAL(3,1),
    color VARCHAR(50),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    description TEXT, 
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5), -- rating between 0 and 5
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for orders (to track customer purchases)
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pending'
);

-- Table to link shoes to an order (Many-to-many relationship between shoes and orders)
CREATE TABLE order_items (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id) ON DELETE CASCADE,
    shoe_id INT REFERENCES shoes(shoe_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

-- Table for special offers (discounts or promotional deals)
CREATE TABLE special_offers (
    offer_id SERIAL PRIMARY KEY,
    offer_name VARCHAR(255) NOT NULL,
    description TEXT,
    discount_percentage DECIMAL(5,2) CHECK (discount_percentage > 0 AND discount_percentage <= 100),
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);

-- Table to link special offers to shoes (Many-to-many relationship between shoes and offers)
CREATE TABLE shoe_offers (
    shoe_id INT REFERENCES shoes(shoe_id) ON DELETE CASCADE,
    offer_id INT REFERENCES special_offers(offer_id) ON DELETE CASCADE,
    PRIMARY KEY (shoe_id, offer_id)
);

-- Table for shopping cart
CREATE TABLE shopping_cart (
    cart_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(customer_id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table to store cart items (many-to-many relationship between cart and shoes)
CREATE TABLE cart_items (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES shopping_cart(cart_id) ON DELETE CASCADE,
    shoe_id INT REFERENCES shoes(shoe_id) ON DELETE CASCADE,
    quantity INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- --- Dynamic View for Popular Shoes ---

-- Create a view for popular shoes based on the total quantity sold and average rating
CREATE VIEW popular_shoes_view AS
SELECT 
    s.shoe_id,
    s.model_name,
    s.brand_id,
    s.size,
    s.color,
    s.price,
    s.stock_quantity,
    s.rating,
    COALESCE(SUM(oi.quantity), 0) AS total_sold, -- Total quantity sold from the order_items
    AVG(s.rating) AS average_rating -- Average rating for the shoes
FROM shoes s
LEFT JOIN order_items oi ON s.shoe_id = oi.shoe_id
GROUP BY s.shoe_id
HAVING COALESCE(SUM(oi.quantity), 0) > 0 -- Only shoes that have been sold
ORDER BY total_sold DESC, average_rating DESC; -- Sort by the most sold and highest rating
