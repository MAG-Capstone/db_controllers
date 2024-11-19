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

