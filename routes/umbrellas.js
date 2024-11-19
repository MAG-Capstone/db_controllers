import express from 'express';
const router = express.Router();

const timeLog = (req,res,next) =>{
	console.log("Time: ", Date.now())
	next()
}


router.use(timeLog)

router.get('/', (req, res) => {
res.send("Umbrellas")

})

router.get('/:customerid', (req, res) => {

res.send("Umbrellas")

})

router.post('/', (req, res) => {

res.send("Umbrellas Post request")

})




export default router;
