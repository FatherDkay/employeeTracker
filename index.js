const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

//create database connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'employeeTracker_db',
  password: 'MyWifeLoves2Fuck'
});

//Begin Menu Functions
function mainMenu(){
  console.clear();
  promptUser();
}

function promptUser () {
inquirer
  .prompt([
    {
        type: 'list',
        name: 'option',
        message: 'What would you like to do?',
        choices: ['View/Edit Departments', 'View/Edit Employees', 'View/Edit Roles','Quit'],
    },
  ])
  .then(({option}) => {
    switch(option) {
      case "View/Edit Departments":
        departments();
      break;

      case "View/Edit Roles":
        roles();
      break;

      case "View/Edit Employees":
        employees();
      break;

      case "Quit":
        quit();
      break;

      case "Update An Employee Manager":
        updateManager();
        break;
    }
  });
}

function employees () {
  inquirer
  .prompt ([
    {
      type: 'list',
      name: 'employeeTask',
      message: 'what would you like to do?',
      choices: ['View Employees', 'Add An Employee', 'Update An Employees Role','Update An Employees Manager', 'Delete An Employee', 'Main Menu'],
    }
  ])
  .then(({employeeTask}) => {
    switch(employeeTask) {
      case "View Employees":
        viewEmployees();
      break;

      case "Add An Employee":
        addEmployee();
      break;

      case "Update An Employees Role":
        updateEmployeeRole();
      break;

      case "Update An Employees Manager":
        updateEmployeeManager();
      break;

      case "Delete An Employee":
        deleteEmployee();
      break;

      case "Main Menu":
        mainMenu();
      break;
    }
  });
}

function viewEmployees () {
  inquirer
  .prompt ([
    {
      type: 'list',
      name: 'employeeView',
      message: 'How would you like to sort the list',
      choices: ['Last Name', 'First Name', 'Department', 'Manager', 'Role', 'Main Menu'],
    }
  ])
  .then(({employeeView}) => {
    switch(employeeView) {
      case "Last Name":
        employeeQueryAllLast();
      break;

      case "First Name":
        employeeQueryAllFirst();
      break;

      case "Department":
        employeeQueryAllDepartment();
      break;

      case "Manager":
        employeeQueryAllManager();
      break;

      case "Role":
        employeeQueryAllRole();
      break;

      case "Main Menu":
        mainMenu();
      break;
    }
  });
}

function departments () {
  inquirer
  .prompt ([
    {
      type: 'list',
      name: 'departmentTask',
      message: 'what would you like to do?',
      choices: ['View Departments', 'Add A Department', 'Delete A Department', 'Main Menu'],
    }
  ])
  .then(({departmentTask}) => {
    switch(departmentTask) {
      case "View Departments":
        departmentQueryAll();
      break;

      case "Add A Department":
        addDepartment();
      break;

      case "Delete A Department":
        deleteDepartment();
      break;

      case "Main Menu":
        mainMenu();
      break;
    };
  });
}

function roles() {
  inquirer
  .prompt ([
    {
      type: 'list',
      name: 'roleTask',
      message: 'what would you like to do?',
      choices: ['View Roles', 'Add A Role', 'Delete A Role', 'Main Menu'],
    }
  ])
  .then(({roleTask}) => {
    switch(roleTask) {
      case "View Roles":
        roleQueryAll();
      break;

      case "Add A Role":
        addRole();
      break;

      case "Delete A Role":
        deleteRole();
      break;

      case "Main Menu":
        mainMenu();
      break;
    };
  });
}
//End Menu Functions

//Begin Employee Queries
//Begin Employee List Queries
function employeeQueryAllLast(){
  connection.query(
    "SELECT employee.id AS ID, employee.last_name AS Last, employee.first_name AS First, role.title AS Role, department.name AS Department, role.salary AS Salary, CONCAT (employee_1.first_name,' ',employee_1.last_name) AS Manager FROM ((employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee AS employee_1 ON employee.manager_id = employee_1.id ORDER BY employee.last_name", function(err,results) {
      console.log('All Employees, Sorted By Last Name:')
      console.table(results);
      employees();
    }
  );
}

function employeeQueryAllRole(){
  connection.query(
    "SELECT employee.id AS ID, role.title AS Role, employee.last_name AS Last, employee.first_name AS First, department.name AS Department, role.salary AS Salary, CONCAT (employee_1.first_name,' ',employee_1.last_name) AS Manager FROM ((employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee AS employee_1 ON employee.manager_id = employee_1.id ORDER BY role.title", function(err,results) {
      console.log('All Employees, Sorted By Last Name:')
      console.table(results);
      employees();
    }
  );
};

function employeeQueryAllFirst(){
  connection.query(
    "SELECT employee.id AS ID, employee.first_name AS First, employee.last_name AS Last, role.title AS Role, department.name AS Department, role.salary AS Salary, CONCAT (employee_1.first_name,' ',employee_1.last_name) AS Manager FROM ((employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee AS employee_1 ON employee.manager_id = employee_1.id ORDER BY employee.first_name", function(err,results) {
      console.log('All Employees Sorted By First Name:')
      console.table(results);
      employees();
    }
  );
};

function employeeQueryAllDepartment(){
  connection.query(
    "SELECT employee.id AS ID, department.name AS Department, employee.first_name AS First, employee.last_name AS Last, role.title AS Role, role.salary AS Salary, CONCAT (employee_1.first_name,' ',employee_1.last_name) AS Manager FROM ((employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee AS employee_1 ON employee.manager_id = employee_1.id ORDER BY department.name", function(err,results) {
      console.log('All Employees, Sorted By Department:')
      console.table(results);
      employees();
    }
  );
};

function employeeQueryAllManager(){
  connection.query(
    "SELECT employee.id AS ID, CONCAT (employee_1.first_name,' ',employee_1.last_name) AS Manager, employee.first_name AS First, employee.last_name AS Last, role.title AS Role, department.name AS Department, role.salary AS Salary FROM ((employee LEFT JOIN role ON employee.role_id = role.id) LEFT JOIN department ON role.department_id = department.id) LEFT JOIN employee AS employee_1 ON employee.manager_id = employee_1.id ORDER BY employee_1.first_name", function(err,results) {
      console.log('All Employees, Sorted By Manager Name:')
      console.table(results);
      employees();
    }
  );
};
//End Employee List Queries

function updateEmployeeRole() {
  var employeeList = [];
  var roleList = [];
  connection.query(
    "SELECT employee.id, employee.first_name AS firstName, employee.last_name AS lastName FROM employee", function(err,results) {
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        employeeList.push({ 
          name: `${result.firstName} ${result.lastName}`,
          value: result.id,
          short: result.firstName
        });
      };

  connection.query(
    "SELECT id, title FROM role", function(err,results2) {
      for(var i = 0; i < results2.length; i++) {
        var result2 = results2[i];
        roleList.push({ 
          name: `${result2.title}`,
          value: result2.id,
          short: result2.title
        });
      };

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selEmployee',
          message: 'Select an employee',
          choices: employeeList,
      },

        {
          type: 'list',
          name: 'newRole',
          message: 'Select a new role',
          choices: roleList,
          validate: newRoleList => {
            if (newRoleList) {
              return true;
            } else {
              console.log('Please enter a role for the new employee');
              return false;
            }
          }
        },

        ])
        .then(({selEmployee,newRole}) => {
          connection.query(
            "UPDATE employee SET role_id = (?) WHERE id = (?)",[newRole, selEmployee], function(err,results) {
              console.log(`Employee role has been updated to ${newRole}!
              `);
              employees();
            }
          );
        });
    }
  );
});
};

function updateEmployeeManager() {
  var employeeList = [];
  var managerList = [];
  connection.query(
    "SELECT employee.id, employee.first_name AS firstName, employee.last_name AS lastName FROM employee", function(err,results) {
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        employeeList.push({ 
          name: `${result.firstName} ${result.lastName}`,
          value: result.id,
          short: result.firstName
        });
      };

  connection.query(
    "SELECT employee.id, employee.first_name AS firstName, employee.last_name AS lastName FROM employee", function(err,results2) {
      for(var i = 0; i < results2.length; i++) {
        var result2 = results2[i];
        managerList.push({ 
          name: `${result2.firstName} ${result2.lastName}`,
          value: result2.id,
          short: result2.firstName
        });
      };

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'selEmployee',
          message: 'Select an employee',
          choices: employeeList,
      },

        {
          type: 'list',
          name: 'newManager',
          message: 'Select a new manager',
          choices: managerList,
        },

        ])
        .then(({selEmployee,newManager}) => {
          connection.query(
            "UPDATE employee SET manager_id = (?) WHERE id = (?)",[newManager, selEmployee], function(err,results) {
              console.log(`The selected employee's manager has been updated!
              `);
              employees();
            }
          );
        });
    }
  );
});
};

function addEmployee() {
  var roleList = [];
  var managerList =[];
  connection.query(
    "SELECT id, title FROM role", function(err,results) {
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        roleList.push({ 
          name: result.title,
          value: result.id,
          short: result.title
        });
      };

      connection.query(
        "SELECT id, first_name AS firstName, last_name AS lastName FROM employee", function(err,results2) {
          for(var j = 0; j < results2.length; j++) {
            var result2 = results2[j];
            managerList.push({ 
              name: `${result2.firstName} ${result2.lastName}`,
              value: result2.id,
              short: result2.firstName
            });
          };

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: 'Enter the first name',
          validate: firstNameInput => {
            if (firstNameInput) {
              return true;
            } else {
              console.log('Please enter the employees first name!');
              return false;
            }
          }
        },

        {
          type: 'input',
          name: 'lastName',
          message: 'Enter the last name',
          validate: lastNameInput => {
            if (lastNameInput) {
              return true;
            } else {
              console.log('Please enter the employees last name!');
              return false;
            }
          }
        },
        
        {
            type: 'list',
            name: 'newRole',
            message: 'Select a role for the new employee',
            choices: roleList,
        },

        {
          type: 'list',
          name: 'newManager',
          message: 'Select a manager for the new employee',
          choices: managerList,
      },
        ])
        .then(({firstName, lastName, newRole, newManager}) => {
          connection.query(
            "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",[firstName,lastName, newRole, newManager], function(err,results) {
              console.log(`${firstName} has been added!
              `);
              employees();
            }
          );
        });
      });
    }
  );
};

function deleteEmployee() {
  var employeeList = [];
  connection.query(
    "SELECT id, first_name AS firstName, last_name AS lastName FROM employee", function(err,results) {
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        employeeList.push({ 
          name: `${result.firstName} ${result.lastName}`,
          value: result.id,
          short: result.firstName
        });
      };

    inquirer
      .prompt([
        {
            type: 'list',
            name: 'selEmployee',
            message: 'Select an employee to be deleted',
            choices: employeeList,
        },
        ])
        .then(({selEmployee}) => {
          connection.query(
            "DELETE FROM employee WHERE id = (?)",[selEmployee], function(err,results) {
              console.log(`The selected employee has been deleted!
            `);
            employees();
          }
        );
    });
  });
};
//End Employee Queries

//Begin Department Queries
function departmentQueryAll(){
  connection.query(
    "SELECT department.id AS ID, department.name AS Department FROM department", function(err,results) {
      console.log('All Departments:')
      console.table(results);
      departments();
    }
  );
};

function addDepartment() {
  inquirer
  .prompt([
    {
      type: 'input',
      name: 'newDepartment',
      message: 'Enter the new department name',
      validate: newDepartmentInput => {
        if (newDepartmentInput) {
          return true;
        } else {
          console.log('Please enter the new department name!');
          return false;
        }
      }
    }
  ])
  .then(({newDepartment}) => {
    connection.query(
      "INSERT INTO department(name) VALUES (?)",(newDepartment), function(err,results) {
        console.log(`${newDepartment} has been added!
        `);
        departments();
      }
    );
  });
  };

function deleteDepartment() {
  var departmentList = [];
  connection.query(
    "SELECT id, name FROM department", function(err,results) {
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        departmentList.push({ 
          name: result.name,
          value: result.id,
          short: result.Name
        });
      };

    inquirer
      .prompt([
        {
            type: 'list',
            name: 'selDepartment',
            message: 'Select a department to be deleted',
            choices: departmentList,
        },
        ])
        .then(({selDepartment}) => {
          connection.query(
            "DELETE FROM department WHERE id = (?)",[selDepartment], function(err,results) {
              console.log(`The selected department has been deleted!
              `);
              departments();
           }
        );
    });
  });
};
//End department queries


//Begin Role Queries
function roleQueryAll(){
  connection.query(
    "SELECT role.id AS ID, role.title AS Title, role.salary AS Salary, department.name AS Department FROM role LEFT JOIN department on role.department_id = department.id", function(err,results) {
      console.log('All Employee Roles:')
      console.table(results);
      roles();
    }
  );
};

function addRole() {
  var departmentList = [];
  connection.query(
    "SELECT id, name FROM department", function(err,results) {
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        departmentList.push({ 
          name: result.name,
          value: result.id,
          short: result.Name
        });
      };

    inquirer
      .prompt([
        {
          type: 'input',
          name: 'newName',
          message: 'Enter the new role title',
          validate: newNameInput => {
            if (newNameInput) {
              return true;
            } else {
              console.log('Please enter a title for the new role!');
              return false;
            }
          }
        },
        {
          type: 'input',
          name: 'newSalary',
          message: 'Enter the salary for the new role',
          validate: newSalaryInput => {
            if (newSalaryInput) {
              return true;
            } else {
              console.log('Please enter the salary for the new role!');
              return false;
            }
          }
        },
        
        {
            type: 'list',
            name: 'newDepartment',
            message: 'Select a department for the new role',
            choices: departmentList,
        },
        ])
        .then(({newName, newSalary, newDepartment}) => {
          connection.query(
            "INSERT INTO role(title, salary, department_id) VALUES (?,?,?)",[newName,newSalary, newDepartment], function(err,results) {
              console.log(`${newName} has been added!
              `);
              roles();
          }
        );
    });
  });
};

function deleteRole() {
  var roleList = [];
  connection.query(
    "SELECT id, title FROM role", function(err,results) {
      for(var i = 0; i < results.length; i++) {
        var result = results[i];
        roleList.push({ 
          name: result.title,
          value: result.id,
          short: result.title
        });
      };

    inquirer
      .prompt([
        {
            type: 'list',
            name: 'selRole',
            message: 'Select a role to be deleted',
            choices: roleList,
        },
        ])
        .then(({selRole}) => {
          connection.query(
            "DELETE FROM role WHERE id = (?)",(selRole), function(err,results) {
              console.log(`The selected role has been deleted!
              `);
              roles();
          }
        );
      });
  });
};
//END Role Queries

function quit() {
  console.log ("Thanks for using the Employee Management System.  Goodbye!")
  process.exit()
};

//autoexec
console.clear();
console.log(
`
╭━━━╮╱╱╱╱╱╭╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━╮╭━╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭╮
┃╭━━╯╱╱╱╱╱┃┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱┃┃╰╯┃┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭╯╰╮
┃╰━━┳╮╭┳━━┫┃╭━━┳╮╱╭┳━━┳━━╮┃╭╮╭╮┣━━┳━╮╭━━┳━━┳━━┳╮╭┳━━┳━╋╮╭╯
┃╭━━┫╰╯┃╭╮┃┃┃╭╮┃┃╱┃┃┃━┫┃━┫┃┃┃┃┃┃╭╮┃╭╮┫╭╮┃╭╮┃┃━┫╰╯┃┃━┫╭╮┫┃
┃╰━━┫┃┃┃╰╯┃╰┫╰╯┃╰━╯┃┃━┫┃━┫┃┃┃┃┃┃╭╮┃┃┃┃╭╮┃╰╯┃┃━┫┃┃┃┃━┫┃┃┃╰╮
╰━━━┻┻┻┫╭━┻━┻━━┻━╮╭┻━━┻━━╯╰╯╰╯╰┻╯╰┻╯╰┻╯╰┻━╮┣━━┻┻┻┻━━┻╯╰┻━╯
╱╱╱╱╱╱╱┃┃╱╱╱╱╱╱╭━╯┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╰╯╱╱╱╱╱╱╰━━╯╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰━━╯`
);
promptUser();




