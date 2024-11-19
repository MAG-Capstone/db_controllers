import express from 'express'
const router = express.Router();

import customerRoutes from './customers.js';
import stationRoutes from './stations.js';
import umbrellaRoutes from './umbrellas.js';


router.use('/customers', customerRoutes);
router.use('/stations', stationRoutes);
router.use('/umbrellas', umbrellaRoutes);

export default router;
