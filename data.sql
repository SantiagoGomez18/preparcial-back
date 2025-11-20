INSERT INTO roles (id, role_name, description)
VALUES
  (uuid_generate_v4(), 'admin', 'Administrador del sistema'),
  (uuid_generate_v4(), 'doctor', 'Usuario doctor');

INSERT INTO users (id, email, password, name, phone, is_active)
VALUES
  (uuid_generate_v4(), 'admin@example.com', '$2a$10$eR4Gd6QJH/pq8E..yVvP9e5cpsJrD7i5HXjsv4gJFo4r9uxBqXzLi', 'Admin User', NULL, true),
  (uuid_generate_v4(), 'user@example.com', '$2a$10$eR4Gd6QJH/pq8E..yVvP9e5cpsJrD7i5HXjsv4gJFo4r9uxBqXzLi', 'Normal User', NULL, true);

INSERT INTO users_roles (usersId, rolesId)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'admin@example.com' AND r.role_name = 'admin';

INSERT INTO users_roles (usersId, rolesId)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'user@example.com' AND r.role_name = 'doctor';
