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
('Legal Team Lead',120000,4),
('Lawyer',140000,4);

INSERT INTO employee(first_name,last_name,role_id, manager_id)
VALUES
("Joe","Mixon", 1 , Null),
("Joe","Burrow", 3 , Null),
("Tom","Brady", 4 , Null),
("Tony","Pollard", 4 , 3),
("Aaron","Rodgers", 2 , null),
("Josh","Allen", 1 , 1);