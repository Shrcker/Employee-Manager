const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
});

const capitalizeFirst = (word) => {
  const wordList = word.split(" ");
  const wordEnd = wordList.map((currentWord) => currentWord.slice(1).toLowerCase());
  const firstLetter = wordList.map((currentWord) => currentWord.charAt(0).toUpperCase());
  for (let i = 0; i < wordList.length; i++) {
    wordList[i] = firstLetter[i] + wordEnd[i];
  }
  return wordList.join(" ");
};

const userChoices = [
  "View all departments",
  "View all roles",
  "View all employees",
  "Add department",
  "Add role",
  "Add employee",
  "Quit",
];

const selectTable = (table) => {
  connection.query(`SELECT * FROM ${table}`, (error, results) => {
    if (error) {
      console.info(error);
    } else {
      // Try to remove the index of this table later if there's time
      console.table(results);
      userPrompts();
    }
  });
};

const addRow = (table) => {
  if (table === "department") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the department you'd like to add?",
          name: "title",
        },
      ])
      .then((input) => {
        connection.query(
          `INSERT INTO department (name) VALUES ("${capitalizeFirst(input.title)}");`
        );
        selectTable(table);
      });
  } else if (table === "role") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What role are you adding?",
          name: "title",
        },
        {
          type: "input",
          message: "What is this role's average salary?",
          name: "salary",
        },
        {
          type: "input",
          message: "Which department does this role belong to?",
          name: "department",
        },
      ])
      .then((input) => {
        connection.query(`
  					INSERT INTO role (title, salary, department_id)
  					VALUES ("${capitalizeFirst(input.title)}", ${Number(input.salary)},
  					(SELECT id FROM department 
						WHERE name = "${capitalizeFirst(input.department)}"));`);
        selectTable(table);
      });
  } else if (table === "employee") {
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the employee's last name?",
          name: "lastName",
        },
        {
          type: "input",
          message: "What is the employee's role?",
          name: "role",
        },
        {
          type: "confirm",
          message: "Is the employee a manager?",
          name: "isManager",
        },
        {
          type: "input",
          message: "Who is this employee's manager?",
          name: "manager",
          when(answers) {
            return !answers.isManager;
          },
        },
      ])
      .then((input) => {
        if (!input.isManager) {
          connection.query(`
  					INSERT INTO employee (first_name, last_name, role_id, manager_id)
  					VALUES 
						('${capitalizeFirst(input.firstName)}', 
							'${capitalizeFirst(input.lastName)}',
  						(SELECT id FROM role WHERE title='${capitalizeFirst(input.role)}'),
  						(SELECT id FROM employee WHERE first_name='${capitalizeFirst(input.manager)}'
						);`);
          selectTable(table);
        } else {
          connection.query(`
  					INSERT INTO employee (first_name, last_name, role_id, manager_id)
  					VALUES 
						('${capitalizeFirst(input.firstName)}', 
							'${capitalizeFirst(input.lastName)}',
  						(SELECT id FROM role WHERE title='${capitalizeFirst(input.role)}'), 
							NULL
						);`);
          selectTable(table);
        }
      });
  } else {
    console.log("Error: Could not parse input");
  }
};

const userPrompts = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: userChoices,
      },
    ])
    .then((input) => {
      switch (input.choice) {
        case userChoices[0]:
          selectTable("department");
          break;
        case userChoices[1]:
          selectTable("role");
          break;
        case userChoices[2]:
          selectTable("employee");
          break;
        case userChoices[3]:
          addRow("department");
          break;
        case userChoices[4]:
          addRow("role");
          break;
        case userChoices[5]:
          addRow("employee");
          break;
        case userChoices[6]:
          process.exit();
      }
    });
};

userPrompts();
