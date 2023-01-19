const { empty } = require('rxjs');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'department'
  }
);

module.exports = Department;



























// const inquirer = require("inquirer");
// const cTable = require("console.table");
// const { response } = require("express");
// const questions = () => {
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         message: "What would you like to do: ",
//         name: "choice",
//         choices: [
//           "Add Employee",
//           "Update Employee",
//           "View All Roles",
//           "Add Role",
//           "View Departments",
//           "Add Department",
//           "View All Employee's",
//         ],
//       },
//     ])
//     .then((response) => {
//       if (choice == "View Departments") {
//         // Query database
//         db.query("SELECT * FROM department", function (err, results) {
//           console.log(results);
//         });
//       } else if (choice == "View All Roles") {
//         // Query database
//         db.query("SELECT * FROM role", function (err, results) {
//           console.log(results);
//         });
//       } else if (choice == "View All Employee's") {
//         // Query database
//         db.query("SELECT * FROM employee", function (err, results) {
//           console.log(results);
//         });
//       }
//     });
// };
// questions();

// // for the view options we willl do get from mysql to view
// // for add department
//       {
//       type: 'input',
//       message: 'What is the name of the Department: ',
//       name: 'addDep',
//       // have it print out"added name of departmetn to database
//       },
//       // for add role
//       {
//       type: 'input',
//       message: 'What is the name of the role: ',
//       name: 'addRole',
//       },
//       {
//       type: 'input',
//       message: 'What is the salary of the role: ',
//       name: 'salary',
//       },
//       {
//         type: 'input',
//         message: 'Which department does the role belong to?',
//         name: 'depRole',
//         choices:["Sales", "Engineering", "Finance", "Legal"]
//       },
//         // have it print out"added name of departmetn to database

//       // for add employee
//       {
//         type: 'input',
//         message: "What is the employee's first name: ",
//         name: 'firstName',
//         },
//         {
//         type: 'input',
//         message: "What is the employee's last name: ",
//         name: 'lastName',
//         },
//         {
//           type: 'input',
//           message: "What is the employee's Role?",
//           name: 'employRole',
//           choices:['Sales Lead',
//           'Salesperson',
//           'Lead Engineer',
//           'Software Engineer',
//           'Account Manager',
//           'Accountant',
//           'Legal Team Lead',
//           'Lawyer']
//         },
//         {
//           type: 'input',
//           message: "Who is the employee's manager?",
//           name: 'manager',
//           choices:[all managers]
//         },

//   // for update role
//         {
//           type: 'input',
//           message: "Which employee's role would you like to update?",
//           name: 'employee',
//           choices:[all employees]
//         },
//         {
//           type: 'input',
//           message: "Which role do you want to assign to the selected employee?",
//           name: 'updateRole',
//           choices:['Sales Lead',
//           'Salesperson',
//           'Lead Engineer',
//           'Software Engineer',
//           'Account Manager',
//           'Accountant',
//           'Legal Team Lead',
//           'Lawyer']
//         }

//           // have it print out"added name of employee to database

//         // for update role

//     ])
//     .then((response) =>{});

//   }
