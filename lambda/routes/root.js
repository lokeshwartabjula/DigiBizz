import express from 'express';
import { getItemsDetail, storeData } from '../controllers/root.js';

const router = express.Router();

router.get('/get-items-detail', getItemsDetail);
router.post('/store-data', storeData);

export default router;
