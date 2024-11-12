# GitHub Repository Stats API

## Project Overview

This API allows users to track and retrieve statistics for specific GitHub repositories. It will fetch and store data like the number of stars, forks, and open issues, allowing periodic updates to keep stats current. This project will demonstrate CRUD operations, external API integration, and data fetching automation.

### Tech Stack

- `Node.js` with `Express` for server and API routes
- `TypeScript` for type safety
- `Axios` (or `node-fetch`) for `HTTP` requests to the GitHub API
- `SQLite` or `MongoDB` (if you prefer a `NoSQL` approach) for database storage
- `Node-cron` for scheduling periodic updates

### Key Features

- **Add a Repository to Track**: Endpoint to add a new repository to the tracking list.
- **Retrieve Repository Stats**: Endpoint to fetch stored stats for a given repository.
- **Update Stats**: Periodic fetching of updated stats directly from the GitHub API.
- **Remove a Repository**: Endpoint to remove a repository from tracking.

---

## Step-by-Step Development

### Step 1: Set Up the Project

1. Initialize a new `Node.js` project:

```bash
mkdir github-repo-stats-api
cd github-repo-stats-api
npm init -y
```

2. Install dependencies:

```bash
npm install express axios sqlite3 node-cron
npm install --save-dev typescript @types/express ts-node nodemon
```

3. Set up TypeScript configuration:

```bash
npx tsc --init
```

4. Create the folder structure:

```
├── src
│   ├── controllers
│   ├── routes
│   ├── models
│   ├── services
│   └── app.ts
└── package.json
```

### Step 2: Define the Repository Model

1. Create a Repository model in src/models/repository.ts:

```tsx
interface Repository {
  id?: number;
  name: string;
  owner: string;
  stars: number;
  forks: number;
  openIssues: number;
  lastUpdated: string;
}

export default Repository;
```

2. Set up the database connection and create a repositories table to store tracked repositories.

### Step 3: Build the Core Routes

1. Add Repository to Track (`POST /repositories`):
   - Accept repository `owner` and `name`.
   - Fetch initial stats from GitHub and save them to the database.
2. Get Repository Stats (`GET /repositories/:id`):
   - Retrieve stats from the database for a specific repository by ID.
3. Update Repository Stats (scheduled task):
   - Use `node-cron` to periodically fetch stats for all repositories from the GitHub API and update them in the database.
4. Delete Repository (`DELETE /repositories/:id`):
   - Remove a repository from tracking.

### Step 4: Implement GitHub API Integration

1. Create a service in `src/services/githubService.ts` to interact with the GitHub API:

```tsx
import axios from 'axios';

export async function fetchRepositoryStats(owner: string, name: string) {
	const response = await axios.get(https://api.github.com/repos/${owner}/${name});
	const { stargazers_count, forks_count, open_issues_count } = response.data;

	return {
		stars: stargazers_count,
    forks: forks_count,
    openIssues: open_issues_count,
    lastUpdated: new Date().toISOString()
	};
}
```

### Step 5: Add the Controller Logic

2. Create controllers in `src/controllers/repositoryController.ts` to handle the logic for each endpoint.
3. Example for adding a repository:

```tsx
import { Request, Response } from "express";
import * as githubService from "../services/githubService";

export async function addRepository(req: Request, res: Response) {
  const { owner, name } = req.body;

  try {
    const stats = await githubService.fetchRepositoryStats(owner, name);
    // Save stats to the database
    res.status(201).json({ message: "Repository added successfully", stats });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch repository data" });
  }
}
```

### Step 6: Schedule Automatic Updates

1. Use `node-cron` to set up a job in src/app.ts that periodically updates the stats for all tracked repositories:

```tsx
import cron from "node-cron";
import { updateAllRepositories } from "./services/githubService";

cron.schedule("0 * * * *", () => {
  updateAllRepositories();
});
```

### Step 7: Test the API

1. Use a tool like Postman or curl to test each endpoint.
2. Confirm that the API can add repositories, retrieve stats, update periodically, and delete as needed.

### Step 8: Documentation and Deployment

1. Write API documentation with clear explanations of each endpoint, sample requests, and responses.
2. Deploy the API to GitHub and a platform like Heroku or Vercel.

---

### Extra Features

- **Error Handling**: Add more robust error handling, especially for GitHub API request limits.
- **GitHub Authentication**: Use a personal access token to increase GitHub API rate limits.
- **Rate Limiting**: Implement rate limiting on API endpoints to prevent abuse.
- **Front-End Dashboard**: Create a simple front-end interface to visualize repository stats in real-time.
