import express from 'express';

const router = express.Router();


router.get('/details', (req, res)=>{
   return res.send('Hello admin')
});

export default router;