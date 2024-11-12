import express from 'express';
import cron from 'node-cron';
import repositoryRoutes from './routes/repositoryRoutes';
import { updateAllRepositories } from './services/githubService';

// Update repository stats every hour
cron.schedule('0 * * * *', () => {
    updateAllRepositories();
});

const app = express();
app.use(express.json());

app.use('/api', repositoryRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});