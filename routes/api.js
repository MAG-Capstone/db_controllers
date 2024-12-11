import express from 'express'

const router = express.Router();

import customerRoutes from './customers.js';
import stationRoutes from './stations.js';
import umbrellaRoutes from './umbrellas.js';


router.use('/customers', customerRoutes);
router.use('/stations', stationRoutes);
router.use('/umbrellas', umbrellaRoutes);

router.post('/qr-code',async (req,res,next) =>{
try{
	const { stationId, hash } = req.body;
	// res-send("FILL THIS OUT")
 if (!stationId || !hash) {
      return res.status(400).json({ message: 'Station ID and hash are required' });
    }

const valid-hash = await++++++++++++++++++++++
	// TODO: WTF???
	//



} catch (error) {

    console.error('Error validating hash:', error);
    next(error);
  }}
}
export default router;
