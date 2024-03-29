const express = require("express");
const mysql = require("mysql2/promise");
const inquirer = require("inquirer");
require("console.table");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password
    password: "password123",
    database: "company_db",
  },
  console.log(`Connected to the company_db database.`)
);

const questions = () => {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do: ",
        name: "choice",
        choices: [
          "Add Employee",
          "Update Employee",
          "View All Roles",
          "Add Role",
          "View Departments",
          "Add Department",
          "View All Employee's",
        ],
      },
    ])
    .then(async (response) => {
      if (response.choice == "View Departments") {
        // Query database
        (await db).execute("SELECT * FROM department").then(([role]) => {
          console.table(role);
          questions();
        });
      } else if (response.choice == "View All Roles") {
        // Query database
        (await db)
          .execute(
            "select role.id, role.title, department.name as department, role.salary from role left join department on role.department_id=department.id"
          )
          .then(([role]) => {
            console.table(role);
            questions();
          });
      } else if (response.choice == "View All Employee's") {
        // Query database
        (await db)
          .execute(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id"
          )
          .then(([role]) => {
            console.table(role);
            questions();
          });
      } else if (response.choice == "Add Department") {
        addDepartment();
      } else if (response.choice == "Add Role") {
        addRole();
      } else if (response.choice == "Add Employee") {
        // Query database
        getManager();
      } else if (response.choice == "Update Employee") {
        updateEmployee();
      }
    });
};

// // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => console.log("Now listening"));
questions();

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the Department: ",
        name: "addDep",
      },
    ])
    .then(async (response) => {
      (await db).execute(
        `INSERT INTO department(name)VALUES("${response.addDep}")`
      );
      console.log(`${response.addDep} was added to Departments`);
      questions();
    });
};

async function addRole() {
  (await db).execute("SELECT * FROM department").then(([department]) => {
    let departmentArray = department.map(({ id, name }) => {
      return {
        name: `${name}`,
        value: id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the name of the role: ",
          name: "addRole",
        },
        {
          type: "input",
          message: "What is the salary of the role: ",
          name: "salary",
        },
        {
          type: "list",
          message:
            "Enter the number corelating to the department that role belongs to?",
          name: "depRole",
          choices: departmentArray,
        },
      ])
      .then(async (response) => {
        (await db).execute(`INSERT INTO role(title, salary, department_id)
          VALUES
          ('${response.addRole}',${response.salary},${response.depRole})`),
          console.log(`${response.addRole} was added to Roles`);
        questions();
      });
  });
}

async function getManager() {
  (await db).execute("SELECT * FROM employee").then(([employee]) => {
    let managerArray = employee.map(({ id, first_name, last_name }) => {
      return {
        name: `${first_name} ${last_name}`,
        value: id,
      };
    });
    let noManager = { name: "None", value: "Null" };
    managerArray.push(noManager);
    addEmployee(managerArray);
  });
}

async function addEmployee(managerArray) {
  (await db).execute("SELECT * FROM role").then(([role]) => {
    let roleArray = role.map(({ id, title }) => {
      return {
        name: `${title}`,
        value: id,
      };
    });

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name: ",
          name: "firstName",
        },
        {
          type: "input",
          message: "What is the employee's last name: ",
          name: "lastName",
        },
        {
          type: "list",
          message: "What is the employee's Role?",
          name: "employRole",
          choices: roleArray,
        },
        {
          type: "list",
          message: "Who is the employee's manager?",
          name: "manager",
          choices: managerArray,
        },
      ])
      .then(async (response) => {
        (await db)
          .execute(`INSERT INTO employee(first_name,last_name,role_id, manager_id)
          VALUES
          ("${response.firstName}","${response.lastName}",${response.employRole},${response.manager})`),
          console.log(
            `${response.firstName} ${response.lastName} was added to Employees`
          );
        questions();
      });
  });
}

async function updateEmployee() {
  (await db).execute("SELECT * FROM employee").then(([employee]) => {
    let employeeArray = employee.map(({ id, first_name, last_name }) => {
      return {
        name: `${first_name} ${last_name}`,
        value: id,
      };
    });
    updateEmployee2(employeeArray);
  });
}
async function updateEmployee2(employeeArray) {
  (await db).execute("SELECT * FROM role").then(([role]) => {
    let roleArray = role.map(({ id, title }) => {
      return {
        name: `${title}`,
        value: id,
      };
    });

    inquirer
      .prompt([
        {
          type: "list",
          message: "Which employee's role would you like to update?",
          name: "employee",
          choices: employeeArray,
        },
        {
          type: "list",
          message: "Which role do you want to assign to the selected employee?",
          name: "updateRole",
          choices: roleArray,
        },
      ])
      .then(async (response) => {
        (await db).execute(
          `UPDATE employee SET role_id = ${response.updateRole} where id =${response.employee}`
        ),
          console.log("Employee has been updated");
        questions();
      });
  });
}
