import express from 'express';
const router = express.Router();
import {getCustomers, getCustomer } from '../controllers/customers.js';

import SQLDAO from '../sqldao.js'; // Assuming you have the customerDAO setup as before

const timeLog = (req,res,next) =>{
	console.log("Time: ", Date.now())
	next()
}


router.use(timeLog)

router.get('/',getCustomers);

//(req, res) => {
//res.send("CUSTOMERS")
//
//})

router.get('/:customerid', getCustomer);


//(req, res) => {
//
//res.send("CUSTOMERS")
//})

router.post('/', async (req, res) => {

//	res.send("Customer Post request")
	console.log("Received POST request with data:", req.body); // Log the request body for debugging

	// Validate request body for missing or empty data
    if (!req.body || Object.keys(req.body).length === 0) {
        console.log("Request body is empty or undefined");
        return res.status(400).send("Request body is missing");
    }

	const { name, email } = req.body;

	// Check for the required fields
    if (!name || !email) {
        return res.status(400).send("Name and email are required.");
    }

    // Insert the new customer into the database
    try {
        const customerDAO = new SQLDAO("customer");
        const newCustomer = await customerDAO.insert({ name, email });
        res.status(201).json(newCustomer);  // Return the newly created customer
    } catch (err) {
        console.error("Error inserting customer:", err);
        return res.status(500).json({ message: 'Error inserting customer', error: err });
    }



})




export default router;
