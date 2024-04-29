INSERT INTO department (name)
VALUES ("Finance"),
	   ("IT"),
	   ("Operations"),
	   ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Lead", 12.25, 004),
	   ("Industry Expert", 15.20, 003),
	   ("Stock Broker", 23.15, 001),
	   ("Employee Manager", 18.25, 003),
	   ("Software Developer", 16.80, 002);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES	("Doug", "Frankerson", 004, NULL),
		("Jaimie", "Rodrick", 001, 001),
		("Abbie", NULL, 005, 001),
		("Dickerson", "Douch", 003, NULL),
		("Carla", "Simplant", 002, 004)