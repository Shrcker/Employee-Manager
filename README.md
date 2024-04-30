<h1 id='description'>Employee Database Manager <a href="https://opensource.org/licenses/MIT"><img alt="The MIT License" src="https://img.shields.io/badge/License-MIT-yellow.svg" /></a></h1><br />The Employee Database Manager is a simple interface to view and edit the SQL database of a company or other organization. It runs off of SQL and uses mysql2, inquirer, and .env to accomplish an intuitive user interface within node.js.<br /><strong>Link:</strong> <a href=https://github.com/Shrcker/Employee-Manager>Github Link</a><br />
<!-- Insert video here -->
<h3>Table of Contents</h3><ol><li><a href="#description"><span>Description</span></a></li><li><a href="#installation"><span>Installation</span></a></li><li><a href="#usage"><span>Usage</span></a></li><li><a href="#credits"><span>Credits</span></a></li><li><a href="#license"><span>License</span></a></li><li><a href="#questions"><span>Questions</span></a></li><li><a href="#features"><span>Features</span></a></li></ol><br /><h2 id='installation'> Installation</h2><br />Download the project from the Github link above and open the project folder in Microsoft Visual Studio Code. From there, open the project in node.js and enter "npm i" to install all of the necessary dependencies. Once this is done, then look for a file in the main directory named ".env-example
", and inside of this file make sure you enter your MySQL password into the variable DB_PASSWORD. Once this is done, make sure to then delete "example" off the file so that it reads ".env". The rest of the code depends on this file to exist in this way so that it can access your SQL server, and is not tracked by Git. Be careful and make sure to rename this file after adjustment to protect your credentials.<br /><h2 id='usage'> Usage</h2><br /> Source the schema in the database folder with MySQL and then run the program in node.js by entering "node index". You will immediately be presented with the interface's splash screen, where you may add or view your database.<br /><h2 id='credits'> Credits</h2><br /> My tutors as well as primary instructor for helping me understand mysql2.<br /><h2 id='license'> License</h2><br /> The MIT License<br /><h2 id='questions'> Questions</h2><br /> Who is the project's host?<br />It's Shrcker; link to their profile: <a href="https://www.github.com/Shrcker">Link</a><br /> You can contact them through email: tanner.shirkey@gmail.com<br /><h2 id='features'> Features</h2><br />This application can view and add to an SQL database straight from node.js without a user needing to manually input SQL outside of the installation.
