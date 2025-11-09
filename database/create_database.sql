-- Script de création de la base de données Dar Dhiafa Klee
-- Compatible MySQL 8.0+ et MariaDB 10.6+
-- Charset: utf8mb4 pour support complet Unicode (arabe, français, anglais)

-- Créer la base de données
CREATE DATABASE IF NOT EXISTS dardhiafa_klee 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE dardhiafa_klee;

-- ============================================
-- 1. TABLE: roles
-- ============================================
CREATE TABLE roles (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_system (is_system)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. TABLE: role_permissions
-- ============================================
CREATE TABLE role_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id VARCHAR(255) NOT NULL,
    permission VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_role_permission (role_id, permission),
    INDEX idx_role (role_id),
    INDEX idx_permission (permission)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. TABLE: users
-- ============================================
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id VARCHAR(255) NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    INDEX idx_email (email),
    INDEX idx_role (role_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. TABLE: rooms
-- ============================================
CREATE TABLE rooms (
    id VARCHAR(255) PRIMARY KEY,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    name_ar VARCHAR(255),
    type VARCHAR(100) NOT NULL,
    description_fr TEXT,
    description_en TEXT,
    description_ar TEXT,
    capacity INT NOT NULL,
    size_sqm DECIMAL(5,2),
    price_per_night DECIMAL(10,2),
    features JSON,
    images JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. TABLE: room_pricing
-- ============================================
CREATE TABLE room_pricing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id VARCHAR(255) NOT NULL,
    season VARCHAR(50) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    min_nights INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_room (room_id),
    INDEX idx_dates (start_date, end_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 6. TABLE: reservation_requests
-- ============================================
CREATE TABLE reservation_requests (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    nationality VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    whatsapp VARCHAR(50),
    address TEXT,
    room_type VARCHAR(100) NOT NULL,
    number_of_guests INT NOT NULL,
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    include_meals BOOLEAN DEFAULT FALSE,
    message TEXT,
    status ENUM('pending', 'replied', 'confirmed', 'cancelled') DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_email (email),
    INDEX idx_dates (check_in, check_out)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 7. TABLE: reservations
-- ============================================
CREATE TABLE reservations (
    id VARCHAR(255) PRIMARY KEY,
    reservation_request_id VARCHAR(255) NULL,
    guest_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    room_id VARCHAR(255) NOT NULL,
    room_number VARCHAR(50),
    room_type VARCHAR(100) NOT NULL,
    guests INT NOT NULL,
    status ENUM('confirmed', 'pending', 'cancelled', 'completed') DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    deposit_paid DECIMAL(10,2) DEFAULT 0,
    payment_status ENUM('paid', 'partial', 'pending') DEFAULT 'pending',
    source VARCHAR(100),
    notes TEXT,
    created_by VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (reservation_request_id) REFERENCES reservation_requests(id) ON DELETE SET NULL,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_email (email),
    INDEX idx_dates (check_in, check_out),
    INDEX idx_room (room_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 8. TABLE: transactions
-- ============================================
CREATE TABLE transactions (
    id VARCHAR(255) PRIMARY KEY,
    invoice_id VARCHAR(255) UNIQUE NOT NULL,
    reservation_id VARCHAR(255) NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    type ENUM('accommodation', 'extra', 'online') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status ENUM('paid', 'pending', 'cancelled') DEFAULT 'pending',
    date DATE NOT NULL,
    payment_method ENUM('cash', 'bank_transfer', 'card', 'online', 'other') NOT NULL,
    description TEXT,
    room_type VARCHAR(100),
    check_in DATE,
    check_out DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON DELETE SET NULL,
    INDEX idx_reservation (reservation_id),
    INDEX idx_status (status),
    INDEX idx_date (date),
    INDEX idx_email (client_email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 9. TABLE: gallery
-- ============================================
CREATE TABLE gallery (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title_fr VARCHAR(255),
    title_en VARCHAR(255),
    title_ar VARCHAR(255),
    description_fr TEXT,
    description_en TEXT,
    description_ar TEXT,
    image_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    category VARCHAR(100),
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (is_active),
    INDEX idx_order (order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 10. TABLE: content
-- ============================================
CREATE TABLE content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL,
    title_fr VARCHAR(255),
    title_en VARCHAR(255),
    title_ar VARCHAR(255),
    content_fr TEXT,
    content_en TEXT,
    content_ar TEXT,
    image_url VARCHAR(500),
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_active (is_active),
    INDEX idx_order (order_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 11. TABLE: experiences
-- ============================================
CREATE TABLE experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    name_ar VARCHAR(255),
    description_fr TEXT,
    description_en TEXT,
    description_ar TEXT,
    duration VARCHAR(50),
    image_url VARCHAR(500),
    highlights JSON,
    included JSON,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 12. TABLE: activity_log
-- ============================================
CREATE TABLE activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL,
    target_type VARCHAR(100),
    target_id VARCHAR(255),
    target_name VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_created (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 13. TABLE: sessions (Optionnel)
-- ============================================
CREATE TABLE sessions (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    token VARCHAR(500) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 14. TABLE: settings
-- ============================================
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    type VARCHAR(50) DEFAULT 'string',
    category VARCHAR(100),
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (key_name),
    INDEX idx_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DONNÉES INITIALES
-- ============================================

-- Créer les rôles système
INSERT INTO roles (id, name, description, is_system) VALUES
('superadmin', 'Super Administrateur', 'Accès complet à toutes les fonctionnalités', TRUE),
('admin', 'Administrateur', 'Gestion complète des opérations quotidiennes', TRUE);

-- Permissions pour Super Admin
INSERT INTO role_permissions (role_id, permission) VALUES
('superadmin', '*');

-- Permissions pour Admin
INSERT INTO role_permissions (role_id, permission) VALUES
('admin', 'dashboard.read'),
('admin', 'rooms.manage'),
('admin', 'pricing.manage'),
('admin', 'gallery.manage'),
('admin', 'content.manage'),
('admin', 'reservations.manage'),
('admin', 'sales.read'),
('admin', 'sales.export'),
('admin', 'sales.edit'),
('admin', 'analytics.read'),
('admin', 'analytics.export'),
('admin', 'seo.read'),
('admin', 'seo.update');

-- Créer l'utilisateur superadmin par défaut
-- NOTE: Le mot de passe doit être hashé avec bcrypt/argon2
-- Exemple avec bcrypt pour "2025DarDK!@" : $2b$10$...
-- À remplacer par le hash réel lors de l'installation
INSERT INTO users (id, name, email, password_hash, role_id, status) VALUES
('1', 'Administrateur', 'contact@dardhiafaklee.com', '$2b$10$PLACEHOLDER_HASH_ICI', 'superadmin', 'active');

-- Paramètres par défaut
INSERT INTO settings (key_name, value, type, category, description) VALUES
('establishment_name', 'Dar Dhiafa Klee', 'string', 'general', 'Nom de l\'établissement'),
('contact_email', 'contact@dardhiafaklee.com', 'string', 'general', 'Email de contact'),
('contact_phone', '+216 20 987 654', 'string', 'general', 'Téléphone de contact'),
('address', 'Rue de la Médina, Kairouan, Tunisie', 'string', 'general', 'Adresse de l\'établissement'),
('website', 'https://dardhiafa.com', 'string', 'general', 'Site web'),
('city_tax', '2', 'number', 'general', 'Taxe de séjour par personne et par nuit'),
('default_language', 'fr', 'string', 'general', 'Langue par défaut'),
('timezone', 'Africa/Tunis', 'string', 'general', 'Fuseau horaire');

