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

const selectDepartment = (table) => {
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
          selectDepartment("department");
          break;
        case userChoices[1]:
          selectDepartment("role");
          break;
        case userChoices[2]:
          selectDepartment("employee");
          break;
        case userChoices[6]:
          process.exit();
      }
    });
};

userPrompts();
