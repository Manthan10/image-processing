CREATE TABLE processing_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    request_id CHAR(36) NOT NULL,
    status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    serial_number INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    input_image_urls TEXT NOT NULL,
    output_image_urls TEXT,
    request_id CHAR(36),
    FOREIGN KEY (request_id) REFERENCES processing_requests(request_id)
);