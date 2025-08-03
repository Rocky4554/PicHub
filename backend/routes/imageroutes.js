import express from 'express';
import { 
  generateImage, 
  editImage, 
  saveImage, 
  getSavedImages, 
  getImageById, 
  deleteImage, 
  downloadSavedImage,
} from '../controllers/imageControllers.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Existing routes
router.post('/create-image', generateImage);
router.post('/edit-image', upload.single('image'), editImage);

// New routes for database operations
router.post('/save-image', saveImage);
router.get('/saved-images', getSavedImages);
router.get('/saved-images/:id', getImageById);
router.delete('/saved-images/:id', deleteImage);
router.get('/download-image/:fileName', downloadSavedImage);


export default router;