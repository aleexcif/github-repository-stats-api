import db from '../database';
import Repository from './repository';

// Insert a new repository into the database
export function addRepository(repo: Omit<Repository, 'id'>): void {
    const stmt = db.prepare(`
        INSERT INTO repositories (name, owner, stars, forks, openIssues, lastUpdated)
        VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(repo.name, repo.owner, repo.stars, repo.forks, repo.openIssues, repo.lastUpdated);
}

// Retrieve a repository by ID
export function getRepositoryById(id: number): Repository | undefined {
    const stmt = db.prepare(`
        SELECT * FROM repositories WHERE id = ?
    `);
    return stmt.get(id) as Repository | undefined; // Type assertion added here
}

// Update a repository’s stats
export function updateRepositoryStats(id: number, stars: number, forks: number, openIssues: number, lastUpdated: string): void {
    const stmt = db.prepare(`
        UPDATE repositories
        SET stars = ?, forks = ?, openIssues = ?, lastUpdated = ?
        WHERE id = ?
    `);
    stmt.run(stars, forks, openIssues, lastUpdated, id);
}

// Delete a repository from tracking
export function deleteRepository(id: number): void {
    const stmt = db.prepare(`
        DELETE FROM repositories WHERE id = ?
    `);
    stmt.run(id);
}

// Retrieve all repositories
export function getAllRepositories(): Repository[] {
    const stmt = db.prepare('SELECT * FROM repositories');
    return stmt.all() as Repository[];
}