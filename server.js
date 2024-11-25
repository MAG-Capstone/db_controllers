import express from 'express';
import apiRoutes from './routes/api.js';

import { getCustomers, getCustomer, createCustomer } from './controllers/customers.js';

import customersRoutes from './routes/customers.js'; // Import customers router
import preferencesRoutes from './routes/preferences.js'; // Import the preferences router

const app = express();
const port = 3000


app.use(express.json());

app.use('/api',apiRoutes);

app.use('/customers', customersRoutes);

app.use('/user/preferences', preferencesRoutes);

app.get('/', (req, res) => {
 res.send('Hello World!')
})
app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`)
})

// GET
app.get('/customers', getCustomers); // GET all customers
app.get('/customers/:customerid', getCustomer); // GET a specific customer by ID
app.post('/customers', createCustomer); // POST to create a new customer

