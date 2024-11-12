import { Request, Response } from 'express';
import * as repositoryModel from '../models/repositoryModel';
import * as githubService from '../services/githubService';

export async function addRepository(req: Request, res: Response) {
    const { owner, name } = req.body;

    try {
        // Fetch initial stats from GitHub API
        const stats = await githubService.fetchRepositoryStats(owner, name);

        // Save repository with stats to the database
        repositoryModel.addRepository({ name, owner, ...stats });
        
        res.status(201).json({ message: 'Repository added successfully', stats });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add repository', error: (error as Error).message });
    }
}

export function getRepositoryStats(req: Request, res: Response) {
    const { id } = req.params;

    try {
        const repository = repositoryModel.getRepositoryById(Number(id));
        
        if (repository) {
            res.json(repository);
        } else {
            res.status(404).json({ message: 'Repository not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve repository stats', error: (error as Error).message });
    }
}

export function deleteRepository(req: Request, res: Response) {
    const { id } = req.params;

    try {
        repositoryModel.deleteRepository(Number(id));
        res.json({ message: 'Repository deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete repository', error: (error as Error).message });
    }
}