INSERT INTO department
  (name)
VALUES
  ('Administration'),
  ('Classroom'),
  ('Facilities'),
  ('Information Technology');

INSERT INTO role
(title, salary, department)
VALUES
('Managing Director', 110000,1),
('Director',90000,1),
('Asc. Director',85000,1),
('Office Manager',60000,1),
('Office Staff',45000,1),
('Receptionist',40000,1),
('Teacher',65000,2),
('Asc. Teacher',50000,2),
('Aide',35000,2),
('Maintainance',45000,3),
('Janitor',35000,3),
('Grounds Keeper',35000,3),
('IT Manager',85000,4),
('Support Specialist',60000,4);

INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Shawn','Peterson',1,NULL),
('Nick','Pinto',2,1),
('Paul','Bailey',3,2),
('Claret','Ortiz',4,2),
('Lindsey','Baird',5,4),
('Kyara','Sandaval',6,4),
('Olivia','Villasenior',7,3),
('Vincent', 'Nguyen',7,3),
('Roger','Buena',7,3),
('Jessica','Richmand',7,3),
('George',"Smith",8,7),
('Veronica','Douglas',8,8)
('Cullen','Gentris',8,9),
('Patrick','Belong',8,10),
('Tony','Alverez'9,3),
('Rosemary', 'Laree',9,3),
('Cynthia','Gilbert',9,3),
('Lorrane','Robertson',9,3),
('Steven', 'Douglas',9,3),
('Frank','Badillo',10,2),
('Brad', 'Masterson',13,2);

