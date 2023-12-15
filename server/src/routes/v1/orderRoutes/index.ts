import express from 'express';
import {createOrder} from '../../../controllers/order.controller'

const router = express.Router();



router.post('/purchase-course', createOrder);

export default router;
