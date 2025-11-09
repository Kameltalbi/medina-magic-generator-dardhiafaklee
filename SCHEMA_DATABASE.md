# Schéma de Base de Données - Dar Dhiafa Klee

## Tables Principales

### 1. **users** - Utilisateurs
```sql
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, -- Hash bcrypt/argon2
    role_id VARCHAR(255) NOT NULL, -- Référence à roles.id
    status ENUM('active', 'inactive') DEFAULT 'active',
    last_login DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role_id),
    INDEX idx_status (status)
);
```

### 2. **roles** - Rôles et Permissions
```sql
CREATE TABLE roles (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    is_system BOOLEAN DEFAULT FALSE, -- true pour superadmin et admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_system (is_system)
);
```

### 3. **role_permissions** - Permissions par Rôle
```sql
CREATE TABLE role_permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_id VARCHAR(255) NOT NULL,
    permission VARCHAR(255) NOT NULL, -- Ex: "dashboard.read", "rooms.manage"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE KEY unique_role_permission (role_id, permission),
    INDEX idx_role (role_id),
    INDEX idx_permission (permission)
);
```

### 4. **rooms** - Chambres
```sql
CREATE TABLE rooms (
    id VARCHAR(255) PRIMARY KEY,
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    name_ar VARCHAR(255),
    type VARCHAR(100) NOT NULL, -- 'suite', 'double', 'twin', 'triple', 'familiale'
    description_fr TEXT,
    description_en TEXT,
    description_ar TEXT,
    capacity INT NOT NULL,
    size_sqm DECIMAL(5,2),
    price_per_night DECIMAL(10,2),
    features JSON, -- Array de caractéristiques
    images JSON, -- Array d'URLs d'images
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_active (is_active)
);
```

### 5. **room_pricing** - Tarifs des Chambres
```sql
CREATE TABLE room_pricing (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_id VARCHAR(255) NOT NULL,
    season VARCHAR(50) NOT NULL, -- 'low', 'mid', 'high', 'peak'
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    price_per_night DECIMAL(10,2) NOT NULL,
    min_nights INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE CASCADE,
    INDEX idx_room (room_id),
    INDEX idx_dates (start_date, end_date)
);
```

### 6. **reservation_requests** - Demandes de Disponibilité
```sql
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
    notes TEXT, -- Notes ajoutées par l'admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_email (email),
    INDEX idx_dates (check_in, check_out)
);
```

### 7. **reservations** - Réservations Confirmées
```sql
CREATE TABLE reservations (
    id VARCHAR(255) PRIMARY KEY,
    reservation_request_id VARCHAR(255) NULL, -- Si créée depuis une demande
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
    source VARCHAR(100), -- 'website', 'phone', 'email', etc.
    notes TEXT,
    created_by VARCHAR(255), -- ID de l'utilisateur qui a créé la réservation
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (reservation_request_id) REFERENCES reservation_requests(id) ON SET NULL,
    INDEX idx_status (status),
    INDEX idx_email (email),
    INDEX idx_dates (check_in, check_out),
    INDEX idx_room (room_id)
);
```

### 8. **transactions** - Transactions de Vente
```sql
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
    FOREIGN KEY (reservation_id) REFERENCES reservations(id) ON SET NULL,
    INDEX idx_reservation (reservation_id),
    INDEX idx_status (status),
    INDEX idx_date (date),
    INDEX idx_email (client_email)
);
```

### 9. **gallery** - Galerie d'Images
```sql
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
    category VARCHAR(100), -- 'interior', 'exterior', 'rooms', 'experiences', etc.
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (is_active),
    INDEX idx_order (order_index)
);
```

### 10. **content** - Contenu du Site
```sql
CREATE TABLE content (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(100) NOT NULL, -- 'hero_slide', 'about_section', 'page_content', etc.
    title_fr VARCHAR(255),
    title_en VARCHAR(255),
    title_ar VARCHAR(255),
    content_fr TEXT,
    content_en TEXT,
    content_ar TEXT,
    image_url VARCHAR(500),
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    metadata JSON, -- Données supplémentaires selon le type
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type),
    INDEX idx_active (is_active),
    INDEX idx_order (order_index)
);
```

### 11. **experiences** - Expériences (pour référence)
```sql
CREATE TABLE experiences (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(100) NOT NULL, -- 'culture', 'nature', 'gastronomy', etc.
    name_fr VARCHAR(255) NOT NULL,
    name_en VARCHAR(255),
    name_ar VARCHAR(255),
    description_fr TEXT,
    description_en TEXT,
    description_ar TEXT,
    duration VARCHAR(50), -- Ex: "2h", "Half day"
    image_url VARCHAR(500),
    highlights JSON, -- Array de highlights
    included JSON, -- Array de ce qui est inclus
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category),
    INDEX idx_active (is_active)
);
```

### 12. **activity_log** - Journal d'Activité
```sql
CREATE TABLE activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    action VARCHAR(255) NOT NULL, -- Ex: "Created user", "Updated reservation"
    target_type VARCHAR(100), -- 'user', 'reservation', 'room', etc.
    target_id VARCHAR(255), -- ID de l'entité concernée
    target_name VARCHAR(255), -- Nom de l'entité pour affichage
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_action (action),
    INDEX idx_created (created_at)
);
```

### 13. **sessions** - Sessions Utilisateur (Optionnel)
```sql
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
);
```

### 14. **settings** - Paramètres Généraux
```sql
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    key_name VARCHAR(255) UNIQUE NOT NULL, -- Ex: 'establishment_name', 'contact_email'
    value TEXT,
    type VARCHAR(50) DEFAULT 'string', -- 'string', 'number', 'boolean', 'json'
    category VARCHAR(100), -- 'general', 'seo', 'payment', etc.
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_key (key_name),
    INDEX idx_category (category)
);
```

## Relations entre Tables

```
users ──┬──> roles (via role_id)
        └──> activity_log (via user_id)
        └──> sessions (via user_id)
        └──> reservations (via created_by)

roles ──> role_permissions (via role_id)

rooms ──┬──> room_pricing (via room_id)
        └──> reservations (via room_id)

reservation_requests ──> reservations (via reservation_request_id)

reservations ──> transactions (via reservation_id)
```

## Index Recommandés

- Tous les champs `id` sont PRIMARY KEY (index automatique)
- Tous les champs `_id` (foreign keys) ont des INDEX
- Les champs de recherche fréquents (email, status, dates) ont des INDEX
- Les champs de tri (created_at, order_index) ont des INDEX

## Notes Importantes

1. **Sécurité des mots de passe** : Utiliser bcrypt ou argon2 pour hasher les mots de passe
2. **Dates** : Utiliser DATE pour les dates simples, TIMESTAMP pour les dates avec heure
3. **JSON** : Utiliser JSON pour stocker des arrays ou objets complexes
4. **Soft Delete** : Ajouter un champ `deleted_at` si vous voulez un soft delete
5. **Audit** : Le champ `updated_at` est automatiquement mis à jour
6. **Multilingue** : Les champs avec suffixe `_fr`, `_en`, `_ar` pour le contenu multilingue

