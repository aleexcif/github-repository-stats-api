import { Router } from 'express';
import { addRepository, deleteRepository, getAllRepositories, getRepositoryStats } from '../controllers/repositoryController';

const router = Router();

router.post('/repositories', addRepository);         // Add a repository to track
router.get('/repositories/:id', getRepositoryStats); // Get repository stats
router.delete('/repositories/:id', deleteRepository);// Delete a repository
router.get('/repositories', getAllRepositories);
export default router;