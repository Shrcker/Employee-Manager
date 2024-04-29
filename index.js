const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const connection = await mysql.createConnection({
  host: "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
});

const selectDepartment = () => {
	try {
		const [results] = await connection.query(
			"SELECT * FROM department";
		);
		
		console.log(results);
	} catch (error) {
		console.log(error);
	}
}

const userChoices = [
  "View all departments",
  "View all roles",
  "View all employees",
  "Add department",
  "Add role",
  "Add employee",
];

inquirer
  .prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "choice",
      choices: userChoices,
    },
  ])
  .then((choice) => {
    switch (choice) {
      case choice === userChoices[0]:
        selectDepartment();
        break;
    }
  });
