import express from 'express';
const router = express.Router();
import {getCustomers, getCustomer } from '../controllers/customers.js';
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

router.post('/', (req, res) => {

res.send("Customer Post request")

})




export default router;
