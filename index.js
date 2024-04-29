const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
});

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
      console.alert(error);
    } else {
      // Try to remove the index of this table later if there's time
      console.table(results);
      userPrompts();
    }
  });
};

const addRow = (table) => {
  switch (table) {
    case "department":
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
            `INSERT INTO department (name) VALUES ("${input.title}");`
          );
        });
      break;
    case "role":
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
            message:
              "Which department does this role belong to? Please input an ID number for that department.",
            name: "department",
          },
        ])
        .then((input) => {
          connection.query(`
						INSERT INTO role (title, salary, department_id)
						VALUES ("${input.title}", ${input.salary}, ${input.department});`);
        });
  }
  selectTable(table);
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
        case userChoices[6]:
          process.exit();
      }
    });
};

userPrompts();
