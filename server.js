const express = require('express');
const mysql = require('mysql2/promise');
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
      .then(async(response) => {
        if (response.choice=="View Departments"){
          // Query database
          (await db).execute('SELECT * FROM department')
          .then(([role]) => {
            console.table(role)
            questions()});
          }
         else if (response.choice=="View All Roles"){
          // Query database
          (await db).execute('SELECT * FROM role')
          .then(([role]) => {
            console.table(role)
            questions()});
          }
         else if (response.choice=="View All Employee's"){
          // Query database
          (await db).execute('SELECT * FROM employee')
          .then(([role]) => {
            console.table(role)
            questions()});
          }
         else if (response.choice=="Add Department"){
          addDepartment()
          }
          else if (response.choice=="Add Role"){
              addRole();
            }
            else if (response.choice=="Add Employee"){
              // Query database
              addEmployee();
             }
             else if (response.choice=="Update Employee"){
              updateEmployee()
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
      .then(async(response) => {
        (await db).execute(`INSERT INTO department(name)VALUES("${response.addDep}")`)
          console.log(`${response.addDep} was added to Departments`)
        questions()})
    }

    async function addRole(){
      (await db).execute('SELECT * FROM department')
      .then(([department])=>{
        let departmentArray = department.map(({id, name})=>{
          return ({
            name:`${name}`,
            value: id
          })
        })
        console.log(departmentArray)
      
    
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
            choices:departmentArray
          }
        ])
          .then(async(response) => {
            (await db).execute(`INSERT INTO role(title, salary, department_id)
          VALUES
          ('${response.addRole}',${response.salary},${response.depRole})`),
            console.log(`${response.addRole} was added to Roles`)
          questions()
        })
      })
      }
  


  async function addEmployee() {
    (await db).execute('SELECT * FROM role')
        .then(([role])=>{
          let roleArray = role.map(({id, title})=>{
            return ({
              name:`${title}`,
              value: id
            })
          })
          console.log(roleArray)

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
          choices:roleArray
        },
        {
          type: 'list',
          message: "Who is the employee's manager?",
          name: 'manager',
          choices:["1","2"]
        },
      ])
        .then(async(response) => {
        (await db).execute(`INSERT INTO employee(first_name,last_name,role_id, manager_id)
          VALUES
          ("${response.firstName}","${response.lastName}",${response.employRole},${response.manager})`),
          console.log(`${response.firstName} ${response.lastName} was added to Employees`)
        questions()
      })
      })
      };
  
  async function updateEmployee(){
    (await db).execute('SELECT * FROM employee; SELECT * FROM role')
        .then(([employee])=>{
          let employeeArray = employee.map(({id, first_name, last_name})=>{
            return ({
              name:`${first_name} ${last_name}`,
              value: id
            })
          })
          console.log(employeeArray)
          .then(([role])=>{
            let roleArray = role.map(({id, title})=>{
              return ({
                name:`${title}`,
                value: id
              })
            })
          
            console.log(roleArray)

    inquirer
    .prompt([
        {
          type: 'list',
          message: "Which employee's role would you like to update?",
          name: 'employee',
          choices:employeeArray
        },
        {
          type: 'list',
          message: "Which role do you want to assign to the selected employee?",
          name: 'updateRole',
          choices:roleArray
        }
      ])
      .then(async(response) => {
        (await db).execute(`UPDATE employee SET role_id = ${response.updateRole} where id =${response.employee}`),
          console.log(`${response.employee} was updated`)
        questions()})
      })
    })
  }


  // fix update and mangers