import express from 'express';
import apiRoutes from './routes/api.js';


const app = express();
const port = 3000


app.use(express.json());

app.use('/api',apiRoutes);


app.get('/', (req, res) => {
 res.send('Hello World!')
})
app.listen(port, () => {
 console.log(`Server running at http://localhost:${port}`)
})

// GET

