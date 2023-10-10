var express = require("express");
var router = express.Router();
const authController = require("./../controllers/auth.controller");
const employeeController = require("./../controllers/employees.controller");

/* GET users listing. */

//Employee
router.get("/employees", employeeController.employees);
router.get("/employee/:nik", employeeController.employeeByNik);
router.get("/employees/kejayan", employeeController.employeeKejayan);

// Auth
router.post("/login", authController.login);

module.exports = router;
