import axios from 'axios';
import db from '../database';
import Repository from '../models/repository';
import * as repositoryModel from '../models/repositoryModel';

export async function fetchRepositoryStats(owner: string, name: string) {
    const response = await axios.get(`https://api.github.com/repos/${owner}/${name}`);
    const { stargazers_count, forks_count, open_issues_count } = response.data;

    return {
        stars: stargazers_count,
        forks: forks_count,
        openIssues: open_issues_count,
        lastUpdated: new Date().toISOString()
    };
}

export async function updateAllRepositories() {
    const repositories = db.prepare('SELECT * FROM repositories').all() as Repository[];

    repositories.forEach(async (repo) => {
        try {
            const updatedStats = await fetchRepositoryStats(repo.owner, repo.name);
            repositoryModel.updateRepositoryStats(repo.id, updatedStats.stars, updatedStats.forks, updatedStats.openIssues, updatedStats.lastUpdated);
        } catch (error) {
            console.error(`Failed to update stats for ${repo.owner}/${repo.name}:`, (error as Error).message);
        }
    });
}