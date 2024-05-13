const express = require('express');
const router = express.Router();
const { verifyToken } =require('../jwt');
const EmployeeController = require('../controllers/employeeController');


router.get('/',verifyToken, EmployeeController.index); 
router.post('/login', EmployeeController.login);
router.post('/signup', EmployeeController.signup);
router.get('/show/:employeeID',verifyToken, EmployeeController.show);
router.post('/store',verifyToken, EmployeeController.store);
router.put('/update/:employeeID',verifyToken, EmployeeController.update);
router.delete('/remove/:employeeID',verifyToken, EmployeeController.remove);

module.exports = router;

