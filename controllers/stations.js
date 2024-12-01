import express from 'express';

import SQLDAO from '../sqldao.js';

const stationDAO = new SQLDAO("station");


export const getStations = async (req,res, next) =>{
	try{
		const items = await stationDAO.findAll();
		res.json(items);
	}
	catch (error){
		next(error);
	}
}

export const getStation = async (req,res, next) =>{
	try{
		const {stationid}  = req.params;

		const parsedId = parseInt(stationid,10);
		
		if (isNaN(parsedId)){
			return res.status(400).json({ message: 'Invalid ids. Wtf are you doing?',id: req.params,parsedId: parsedId});
		}


		const items = await stationDAO.find(parsedId);
		if(items){
			res.json(items);
		}
		else{
			res.status(404).json({message: 'Station not found', items: items});
		}
	}
	catch (error){
		next(error);
	}
}

// TODO: POST 

	export const createStation = async (req, res, next) => {
	console.log('Received POST request with data:', req.body);
  
	if (!req.body || Object.keys(req.body).length === 0) {
	  console.log('Request body is empty or undefined');
	  return res.status(400).send('Request body is missing');
	}
  
	const { name, email } = req.body;
	try {
	  const newStation = await stationDAO.insert({ name, email });
	  res.status(201).json(newStation);
	} catch (err) {
	  console.error('Error inserting station:', err);
	  res.status(500).json({ message: 'Error inserting station', error: err });
	}
  };

