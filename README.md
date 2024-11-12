# GitHub Repository Stats API

A RESTful API built with `TypeScript`, `Node.js`, and `SQLite` to track and retrieve GitHub repository statistics such as stars, forks, and open issues.

## Features

- Track GitHub repositories by owner and name
- Retrieve statistics (stars, forks, open issues) for each tracked repository
- Update repository stats periodically with `node-cron`
- Endpoints for adding, retrieving, and deleting tracked repositories

## Prerequisites

- **`Node.js`** v14 or higher
- **GitHub Personal Access Token** (optional, if you need higher API rate limits)

## Installation

1. **Clone the Repository**:
   ```zsh
   git clone https://github.com/aleexcif/github-repository-stats-api.git
   cd github-repository-stats-api
   ```
2. **Install Dependencies**:
   ```zsh
   npm install
   ```
3. **Set Up Environment Variables**:
   - Create a .env file to store environment variables (optional).
     ```
     GITHUB_TOKEN=your_github_personal_access_token`
     ```
4. **Start the Server**:
   - In development with auto-restart:
     ```zsh
     npx ts-node-dev --respawn src/app.ts
     ```
   - In production (compile TypeScript and run `Node.js`):
     ```zsh
     npx tsc
     node dist/app.js
     ```

## Usage

### Endpoints

1. **Add a Repository to Track**:
   - Method: `POST`
   - URL: `http://localhost:3000/api/repositories`
   - curl Command:
     ```zsh
     curl -X POST http://localhost:3000/api/repositories \
       -H "Content-Type: application/json" \
       -d '{"owner": "ownerName", "name": "repositoryName"}'
     ```
   - Expected Response:
     ```json
     {
       "message": "Repository added successfully",
       "stats": {
         "stars": 123,
         "forks": 45,
         "openIssues": 10,
         "lastUpdated": "2024-11-12T08:09:18.417Z"
       }
     }
     ```

<br>

2. **Retrieve All Tracked Repositories**:
   - Method: `GET`
   - URL: `http://localhost:3000/api/repositories`
   - curl Command:
     ```zsh
     curl -X POST http://localhost:3000/api/repositories \
       -H "Content-Type: application/json" \
       -d '{"owner": "ownerName", "name": "repositoryName"}'
     ```
   - Response:
     ```json
     [
       {
         "id": 1,
         "name": "repositoryName",
         "owner": "ownerName",
         "stars": 123,
         "forks": 45,
         "openIssues": 10,
         "lastUpdated": "2024-11-12T08:09:18.417Z"
       },
       ...
     ]
     ```

<br>

3. **Retrieve Stats for a Specific Repository**
   - Method: `GET`
   - URL: `http://localhost:3000/api/repositories/{id}`
   - curl Command:
     ```zsh
     curl -X GET http://localhost:3000/api/repositories/1
     ```
   - Response:
     ```json
     {
       "id": 1,
       "name": "repositoryName",
       "owner": "ownerName",
       "stars": 123,
       "forks": 45,
       "openIssues": 10,
       "lastUpdated": "2024-11-12T08:09:18.417Z"
     }
     ```

<br>

4. **Delete a Repository**
   - Method: `DELETE`
   - URL: `http://localhost:3000/api/repositories/{id}`
   - curl Command:
     ```zsh
     curl -X DELETE http://localhost:3000/api/repositories/1
     ```
   - Response:
     ```json
     {
       "message": "Repository deleted successfully"
     }
     ```

<br>

---

<br>

> [!NOTE]
> This should provide a clear overview and easy-to-follow instructions for anyone interested in using this API. Let me know if you’d like me to clarify any sections further!
>
> This project is licensed under the MIT License. See the [LICENSE](https://github.com/aleexcif/github-repository-stats-api/blob/main/LICENSE) file for details.
