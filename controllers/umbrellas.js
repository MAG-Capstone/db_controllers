import express from 'express';

import SQLDAO from '../sqldao.js';

const umbrellasDAO = new SQLDAO("umbrellas");


export const getUmbrellass = async (req,res, next) =>{
	try{
		const items = await umbrellasDAO.findAll();
		res.json(items);
	}
	catch (error){
		next(error);
	}
}

export const getUmbrellas = async (req,res, next) =>{
	try{
		const {umbrellasid}  = req.params;

		const parsedId = parseInt(umbrellasid,10);
		
		if (isNaN(parsedId)){
			return res.status(400).json({ message: 'Invalid ids. Wtf are you doing?',id: req.params,parsedId: parsedId});
		}


		const items = await umbrellasDAO.find(parsedId);
		if(items){
			res.json(items);
		}
		else{
			res.status(404).json({message: 'Umbrellas not found', items: items});
		}
	}
	catch (error){
		next(error);
	}
}

// TODO: POST 

	export const createUmbrellas = async (req, res, next) => {
	console.log('Received POST request with data:', req.body);
  
	if (!req.body || Object.keys(req.body).length === 0) {
	  console.log('Request body is empty or undefined');
	  return res.status(400).send('Request body is missing');
	}
  
	const { name, email } = req.body;
	try {
	  const newUmbrellas = await umbrellasDAO.insert({ name, email });
	  res.status(201).json(newUmbrellas);
	} catch (err) {
	  console.error('Error inserting umbrellas:', err);
	  res.status(500).json({ message: 'Error inserting umbrellas', error: err });
	}
  };

