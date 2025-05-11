CREATE DATABASE assignment_system;
CREATE USER 'assignment_user'@'localhost' IDENTIFIED BY 'securepassword';
GRANT ALL PRIVILEGES ON assignment_system.* TO 'assignment_user'@'localhost';
FLUSH PRIVILEGES;