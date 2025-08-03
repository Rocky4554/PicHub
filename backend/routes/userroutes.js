// routes/userRoutes.js
import express from 'express';
import {
  createOrUpdateUser,
  getUserById,
  updateProStatus
} from '../controllers/userControllers.js';

const router = express.Router();

// Create or update user
router.post('/sync-user', createOrUpdateUser);

// Get user by ID
router.get('/:userId', getUserById);

// Update pro status
router.put('/:userId/pro-status', updateProStatus);

export default router;