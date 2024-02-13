// Import the necessary modules
import express from 'express';
import { getAllScreens, getScreenById, createScreen, deleteScreen } from './controllers/screenController.ts';

// Create an instance of the Express Router
const router = express.Router();

// Define the routes
router.get('/', getAllScreens);
router.get('/:id', getScreenById);
router.post('/', createScreen);
// router.put('/screens/:id', updateScreen);
router.delete('/:id', deleteScreen);

// Export the router
export default router;
