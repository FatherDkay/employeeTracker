DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30), NOT NULL
  salary DECIMAL,
  department_id INTEGER,
  FOREIGN KEY (department)
  REFERENCES department(id)
  NOT Null
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  FOREIGN KEY (role)
  REFERENCES role(id)
  NOT NULL,
  manager_id INTEGER,
  FOREIGN KEY (employee)
  REFERENCES employee(id),
);
