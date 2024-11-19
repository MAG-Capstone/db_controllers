import express from 'express';
const router = express.Router();

const timeLog = (req,res,next) =>{
	console.log("Time: ", Date.now())
	next()
}


router.use(timeLog)

router.get('/', (req, res) => {
res.send("STATIONS")

})

router.get('/:stationid', (req, res) => {

res.send("Stationid")

})

router.post('/', (req, res) => {

res.send("Customer Post request")

})




export default router;
