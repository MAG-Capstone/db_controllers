import express from 'express';

import {getCustomers, getCustomer, createCustomer } from '../controllers/customers.js';

const router = express.Router();

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

router.post('/', createCustomer);

export default router;
