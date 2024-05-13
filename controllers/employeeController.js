const Employee = require('../models/Employeedb');
const config = require('config');
const debug = require('debug');
const signupModel = require('../models/signup');
const joi=require("joi");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const verify=require("../jwt");
/**
 * @swagger
 * /employee:
 *   get:
 *     summary: Get all employees
 *     description: Retrieve a list of all employees.
 *     responses:
 *       '200':
 *         description: A list of employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Employee'
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred!
 */

const index = (req, res, next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        });
    })
    .catch(error => {
        res.json({
            message: 'An error occurred!'
        });
    });
};

/**
 * @swagger
 * /employee/show/{employeeID}:
 *   get:
 *     summary: Get employee by ID
 *     description: Retrieve an employee's details by their ID.
 *     parameters:
 *       - in: path
 *         name: employeeID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee to retrieve.
 *     responses:
 *       '200':
 *         description: A single employee object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       '404':
 *         description: Employee not found
 *       '500':
 *         description: Internal server error
 */
const show = async (req, res) => {
    try{
    let employeeID = req.params.employeeID;
    const user=await Employee.findById(employeeID);
    res.send(user);
  
    }catch(error){
        res.send(error);
    }
     
    
};

/**
 * @swagger
 * /employee/store:
 *   post:
 *     summary: Signup to be added in the system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - age
 *               - phone
 *     responses:
 *       '200':
 *         description: Employee added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee Added Successfully!
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred!
 */
const store = (req, res, next) => {
    let employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        phone: req.body.phone,
        roleId:req.body.roleId,
    });
    employee.save()
    .then(response => {
        res.json({
            message: 'Employee Added Successfully!'
        });
    })
    .catch(error => {
        res.json({
            message: 'An error occurred!'
        });
    });
};

/**
 * @swagger
 * /employee/update/{employeeID}:
 *   put:
 *     summary: Update an existing employee
 *     description: Update details of an existing employee.
 *     parameters:
 *       - in: path
 *         name: employeeID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *               phone:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Updated successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred!
 */
const update = (req, res, next) => {
    let employeeID = req.params.employeeID;

    let updateData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        phone: req.body.phone
    };
    Employee.findByIdAndUpdate(employeeID, { $set: updateData })
    .then(() => {
        res.json({
            message: 'Updated successfully'
        });
    })
    .catch(error => {
        res.json({
            message: 'An error occurred'
        });
    });
};

/**
 * @swagger
 * /employee/remove/{employeeID}:
 *   delete:
 *     summary: Remove an employee
 *     description: Remove an employee from the system by their ID.
 *     parameters:
 *       - in: path
 *         name: employeeID
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the employee to remove.
 *     responses:
 *       '200':
 *         description: Employee removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Employee removed successfully
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An error occurred!
 */

const remove = (req, res, next) => {
    let employeeID = req.params.employeeID;
    Employee.findByIdAndDelete(employeeID)
    .then(() => {
        res.json({
            message: 'Employee removed successfully'
        });
    })
    .catch(error => {
        res.json({
            message: 'An error occurred'
        });
    });
};

 

 /**
 * @swagger
 * /employee/login:
 *   post:
 *     summary: Login to get access to APIs
 *     tags:
 *       - employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       "200":
 *         description: A message specifying whether your email was sent or not
 *         content:
 *           application/json:
 *             schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: number
 *             required:
 *               - email
 *               - password
 */
const login = async(req,res)=>{
    const data={
        username:req.body.username,
        password:req.body.password,
        roleId:req.body.roleId
    }
    const exists=await signupModel.findOne({username:data.username});
    if(!exists){
        console.log("no user found");
    }else{
        const payload={
            username:data.username,
            password:data.password,
            roleId:data.roleId
        }

        const token=jwt.sign(payload,'limac');
        res.json(token);
    }
}
 
/**
 * @swagger
 * /employee/signup:
 *   post:
 *     summary: Signup to get authorization 
 *     tags:
 *       - employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               roleId:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       "200":
 *         description:  User data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: number
 *               phone:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - age
 *               - phone
 */
const signup = async(req,res)=>{

    try{
        const schema = joi.object({
            username:joi.string().required(),
            password:joi.string().required(),
            email:joi.string().email().required(),
            roleId:joi.number().required(),
        });
        const validity=schema.validate(req.body);
        if(validity.error){
            res.send(validity.error.details[0].message);
            return;
        }

        password=req.body.password;
        const rounds =10
        debug(rounds);
        hashedPass=await bcrypt.hash(password,rounds);
        let user=await signupModel.create({
            username:req.body.username,
            password:hashedPass,
            email:req.body.email,
            roleId:req.body.roleId
        });
        const newUser=await user.save();
         res.status(200).send(newUser);
         console.log(newUser)
         debug(user);
        console.log("User savedd");
    }catch(error){
        res.status(500).send(`Internal error ${error}`);
    }
    
    
}
module.exports = {
    index,
    show,
    store,
    update,
    remove,
    login,
    signup,
    
};

