import express from 'express';
import { downloadSavedImage } from '../controllers/imageControllers.js';

const router = express.Router();

router.get('/api/download/:fileName', downloadSavedImage);

export default router;
