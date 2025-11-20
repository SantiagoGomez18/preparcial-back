INSERT INTO roles (id, role_name, description)
VALUES
  (uuid_generate_v4(), 'admin', 'Administrador del sistema'),
  (uuid_generate_v4(), 'doctor', 'Usuario doctor'),
  (uuid_generate_v4(), 'paciente', 'Usuario paciente');


INSERT INTO users (id, email, password, name, phone, is_active)
VALUES
  (uuid_generate_v4(), 'admin@example.com', '$2a$10$eR4Gd6QJH/pq8E..yVvP9e5cpsJrD7i5HXjsv4gJFo4r9uxBqXzLi', 'Admin User', NULL, true),
  (uuid_generate_v4(), 'doctor@example.com', '$2a$10$eR4Gd6QJH/pq8E..yVvP9e5cpsJrD7i5HXjsv4gJFo4r9uxBqXzLi', 'Doctor Who', NULL, true),
  (uuid_generate_v4(), 'patient@example.com', '$2a$10$eR4Gd6QJH/pq8E..yVvP9e5cpsJrD7i5HXjsv4gJFo4r9uxBqXzLi', 'Paciente Demo', NULL, true);


INSERT INTO users_roles (usersId, rolesId)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'admin@example.com' AND r.role_name = 'admin';


INSERT INTO users_roles (usersId, rolesId)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'doctor@example.com' AND r.role_name = 'doctor';


INSERT INTO users_roles (usersId, rolesId)
SELECT u.id, r.id
FROM users u, roles r
WHERE u.email = 'patient@example.com' AND r.role_name = 'paciente';


INSERT INTO appointments_entity (id, datatime, status, created_at, id_user, id_doctor)
VALUES
  (uuid_generate_v4(), TIMESTAMP '2025-12-01 09:00:00', 'PENDING', NOW(), 
     (SELECT id FROM users WHERE email = 'patient@example.com'),
     (SELECT id FROM users WHERE email = 'doctor@example.com')
  ),
  (uuid_generate_v4(), TIMESTAMP '2025-12-01 10:00:00', 'PENDING', NOW(),
     (SELECT id FROM users WHERE email = 'patient@example.com'),
     (SELECT id FROM users WHERE email = 'doctor@example.com')
  ),
  (uuid_generate_v4(), TIMESTAMP '2025-12-02 11:30:00', 'PENDING', NOW(),
     (SELECT id FROM users WHERE email = 'patient@example.com'),
     (SELECT id FROM users WHERE email = 'doctor@example.com')
  );

