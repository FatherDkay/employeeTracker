DROP TABLE employee;
DROP TABLE role;
DROP TABLE department;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title varchar(30) not null,
    salary DECIMAL,
    department_id INT,
    CONSTRAINT fk_department
    FOREIGN KEY (department_id) 
        REFERENCES department(id)
        ON DELETE SET NULL
);

CREATE TABLE employee(
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  CONSTRAINT fk_role
  FOREIGN KEY (role_id) 
      REFERENCES role(id)
      ON DELETE SET NULL,
  manager_id INT,
  CONSTRAINT fk_employee
  FOREIGN KEY (manager_id) 
      REFERENCES employee(id)
      ON DELETE SET NULL
);
