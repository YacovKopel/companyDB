DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;


USE company_db;
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);

INSERT INTO department(name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role(title, salary, department_id)
VALUES
('Sales Lead',10000,1),
('Salesperson',80000,1),
('Lead Engineer',150000,2),
('Software Engineer',200000,2),
('Account Manager',110000,3),
('Accountant',90000,4),
('Leagal Team Lead',120000,4),
('Lawyer',140000,4);

INSERT INTO employee(first_name,last_name,role_id, manager_id)
VALUES
("Joe","Mixon", 1 , 1),
("Joe","Burrow", 3 , 1),
("Tom","Brady", 4 , 1),
("Tony","Pollard", 4 , 1),
("Aaron","Rodgers", 2 , 1),
("Josh","Allen", 1 , 1);