import express from 'express';


const router = express.Router();

router.get('/details', (req, res)=>{
    return res.send('hello buddy')
})


export default router;


