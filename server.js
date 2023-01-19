const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const { json } = require('express');
require('console.table');

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


const questions = () => {
  inquirer
    .prompt([
      {
      type: 'list',
      message: 'What would you like to do: ',
      name: 'choice',
      choices:["Add Employee", "Update Employee", "View All Roles","Add Role", "View Departments", "Add Department","View All Employee's"]
      },
    ])
      .then((response) => {
        if (response.choice=="View Departments"){
          // Query database
          db.query('SELECT * FROM department', function (err, results) {
            console.table(results);
            questions();
          });
         }
         else if (response.choice=="View All Roles"){
          // Query database
          db.query('SELECT * FROM role', function (err, results) {
            console.table(results);
            questions();
          });
         }
         else if (response.choice=="View All Employee's"){
          // Query database
          db.query('SELECT * FROM employee', function (err, results) {
            console.table(results);
            questions();
          });
         }
         else if (response.choice=="Add Department"){
          addDepartment()
          // need to add away to get to questions to rerender
          }
          else if (response.choice=="Add Role"){
            //  db.query('SELECT * FROM department', function (err, results) {
            //   console.table(results)});
              addRole();
            // need to add a way to get to questions to rerender
            }
            else if (response.choice=="Add Employee"){
              // Query database
              db.query('SELECT * FROM employee', function (err, results) {
                console.table(results);
                questions();
              });
             }
             else if (response.choice=="Add Employee"){
              addEmployee();
              // need to add away to get to questions to rerender
              }
      })
    }
    questions()

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

  app.listen(PORT, () => console.log('Now listening'));


  const addDepartment = () => {
    inquirer
    .prompt([
        {
        type: 'input',
        message: 'What is the name of the Department: ',
        name: 'addDep',
        }
      ])
        .then((response) => {
        db.promise().query(`INSERT INTO department(name)VALUES("${response.addDep}")`),
          console.log(`${response.addDep} was added to Departments`)
        questions()})
    }

    const addRole = () => {
      // let dep=db.query('select group_concat(name) FROM department')
      // console.log(dep)
    
      inquirer
      .prompt([
          {
          type: 'input',
          message: 'What is the name of the role: ',
          name: 'addRole',
          },
          {
          type: 'input',
          message: 'What is the salary of the role: ',
          name: 'salary',
          },
          {
            type: 'list',
            message: 'Enter the number corelating to the department that role belongs to?',
            name: 'depRole',
            choices:["hello"]
            // choices:["Sales", "Engineering", "Finance", "Legal"]
          },
        ])
          .then((response) => {
          db.promise().query(`INSERT INTO role(title, salary, department_id)
          VALUES
          ('${response.addRole}',${response.salary},${response.depRole})`),
            console.log(`${response.addRole} was added to Roles`)
          questions()
        })
      }

  //           const promise = db.promise();
  // // query database using promises
  // const [rows,fields] = await promise.query(`INSERT INTO role(title, salary, department_id)
  // VALUES
  // ('${response.addRole}',${response.salary},${response.depRole})`)
  //   console.log(`${response.addRole} was added to Roles`)});

  const addEmployee = () => {
    inquirer
    .prompt([
        {
        type: 'input',
        message: "What is the employee's first name: ",
        name: 'firstName',
        },
        {
        type: 'input',
        message: "What is the employee's last name: ",
        name: 'lastName',
        },
        {
          type: 'list',
          message: "What is the employee's Role?",
          name: 'employRole',
          choices:['Sales Lead',
          'Salesperson',
          'Lead Engineer',
          'Software Engineer',
          'Account Manager',
          'Accountant',
          'Legal Team Lead',
          'Lawyer']
        },
        {
          type: 'list',
          message: "Who is the employee's manager?",
          name: 'manager',
          choices:["all managers"]
        },
      ])
        .then((response) => {
          db.promise().query(`INSERT INTO employee(first_name,last_name,role_id, manager_id)
          VALUES
          ("${response.firstName}","${response.lastName}",${response.employRole},${response.manager})`,
           function (err, results) {
            console.log(results);
          })
        questions()})
      };
  const updateEmployee = () => {
    inquirer
    .prompt([
        {
          type: 'list',
          message: "Which employee's role would you like to update?",
          name: 'employee',
          choices:["all employees"]
        },
        {
          type: 'list',
          message: "Which role do you want to assign to the selected employee?",
          name: 'updateRole',
          choices:['Sales Lead',
          'Salesperson',
          'Lead Engineer',
          'Software Engineer',
          'Account Manager',
          'Accountant',
          'Legal Team Lead',
          'Lawyer']
        }
      ])
        .then((response) => {
        db.promise().query(`UPDATE role SET role_id = ${response.updateRole}`),
          console.log(`${response.addDep} was added to Departments`)
        questions()})
    }

arrY=[]
  function getdepart(){
    db.promise().query('SELECT * FROM department')
    .then(([dep])=>{
  let deparray= dep.map(({id,name})=> {
    arrY.push(deparray[0])
    console.log(arrY)
    return({
      name:`${name}`,
      value:id,
    })
  })
    })}
