import express from 'express';

import SQLDAO from '../sqldao.js';

const customerDAO = new SQLDAO("customer");


export const getCustomers = async (req,res, next) =>{
	try{
		const items = await customerDAO.findAll();
		res.json(items);
	}
	catch (error){
		next(error);
	}
}

export const getCustomer = async (req,res, next) =>{
	try{
		const {customerid}  = req.params;

		const parsedId = parseInt(customerid,10);
		
		if (isNaN(parsedId)){
			return res.status(400).json({ message: 'Invalid ids. Wtf are you doing?',id: req.params,parsedId: parsedId});
		}


		const items = await customerDAO.find(parsedId);
		if(items){
			res.json(items);
		}
		else{
			res.status(404).json({message: 'Customer not found', items: items});
		}
	}
	catch (error){
		next(error);
	}
}

// TODO: POST 

	export const createCustomer = async (req, res, next) => {
	console.log('Received POST request with data:', req.body);
  
	if (!req.body || Object.keys(req.body).length === 0) {
	  console.log('Request body is empty or undefined');
	  return res.status(400).send('Request body is missing');
	}
  
	const { name, email } = req.body;
	try {
	  const newCustomer = await customerDAO.insert({ name, email });
	  res.status(201).json(newCustomer);
	} catch (err) {
	  console.error('Error inserting customer:', err);
	  res.status(500).json({ message: 'Error inserting customer', error: err });
	}
  };

