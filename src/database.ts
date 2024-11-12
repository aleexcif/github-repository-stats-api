import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Define the path to the database file
const dbPath = path.resolve(__dirname, '../data/github-stats.db');

// Ensure the directory exists
const dir = path.dirname(dbPath);
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

// Initialize the database
const db = new Database(dbPath, { verbose: console.log });

export default db;

db.exec(`
    CREATE TABLE IF NOT EXISTS repositories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        owner TEXT NOT NULL,
        stars INTEGER DEFAULT 0,
        forks INTEGER DEFAULT 0,
        openIssues INTEGER DEFAULT 0,
        lastUpdated TEXT
    );
`);