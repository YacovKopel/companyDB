const { response } = require('express');
const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password
    password: 'password123',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Query database
db.query('SELECT * FROM department', function (err, results) {
  console.log(results);
});
db.query('SELECT * FROM role', function (err, results) {
  console.log(results);
});

db.query('SELECT * FROM employee', function (err, results) {
  console.log(results);
});
// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});
//  adds Department
db.query(`INSERT INTO department(name)
VALUES
("${response.addDep}")`,
 function (err, results) {
  console.log(results);
});
//  adds Role
db.query(`INSERT INTO roles(title, salary, department_id)
VALUES
("${response.addRole}",${response.salary},${response.depRole})`,
 function (err, results) {
  console.log(results);
});

//  adds Department
db.query(`INSERT INTO employee(first_name,last_name,role_id, manager_id)
VALUES
("${response.firstName}","${response.lastName}",${response.employRole},${response.manager})`,
 function (err, results) {
  console.log(results);
});

// updates role
db.query(`UPDATE role SET role_id = ${response.updateRole}`;)
  app.listen(PORT, () => console.log('Now listening'));
