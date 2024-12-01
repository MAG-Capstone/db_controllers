import express from 'express';

import SQLDAO from '../sqldao.js';

const penaltyDAO = new SQLDAO("penalty");


export const getPenaltys = async (req,res, next) =>{
	try{
		const items = await penaltyDAO.findAll();
		res.json(items);
	}
	catch (error){
		next(error);
	}
}

export const getPenalty = async (req,res, next) =>{
	try{
		const {penaltyid}  = req.params;

		const parsedId = parseInt(penaltyid,10);
		
		if (isNaN(parsedId)){
			return res.status(400).json({ message: 'Invalid ids. Wtf are you doing?',id: req.params,parsedId: parsedId});
		}


		const items = await penaltyDAO.find(parsedId);
		if(items){
			res.json(items);
		}
		else{
			res.status(404).json({message: 'Penalty not found', items: items});
		}
	}
	catch (error){
		next(error);
	}
}

// TODO: POST 

	export const createPenalty = async (req, res, next) => {
	console.log('Received POST request with data:', req.body);
  
	if (!req.body || Object.keys(req.body).length === 0) {
	  console.log('Request body is empty or undefined');
	  return res.status(400).send('Request body is missing');
	}
  
	const { name, email } = req.body;
	try {
	  const newPenalty = await penaltyDAO.insert({ name, email });
	  res.status(201).json(newPenalty);
	} catch (err) {
	  console.error('Error inserting penalty:', err);
	  res.status(500).json({ message: 'Error inserting penalty', error: err });
	}
  };

