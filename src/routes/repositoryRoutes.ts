import { Router } from 'express';
import { addRepository, deleteRepository, getRepositoryStats } from '../controllers/repositoryController';

const router = Router();

router.post('/repositories', addRepository);         // Add a repository to track
router.get('/repositories/:id', getRepositoryStats); // Get repository stats
router.delete('/repositories/:id', deleteRepository);// Delete a repository

export default router;