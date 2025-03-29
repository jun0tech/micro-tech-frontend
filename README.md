# Rick and Morty Dashboard

## Getting started
Below are the steps to guide you through preparing your local enviroment for the Dashboard.

### Prerequisites

To begin, ensure you have network access. Then, you'll need the following:

1. [Git](https://git-scm.com/)
2. [Node.JS](https://nodejs.org/en/) version >=22
3. [Pnpm](https://pnpm.io/)

### Local development

Clone the repository using HTTPS, SSH, or Github CLI

```bash
git@github.com:puranban/rick-and-morty-dashboard.git #SSH
https://github.com/puranban/rick-and-morty-dashboard.git #HTTPS
gh repo clone puranban/rick-and-morty-dashboard #Github CLI
```
* Navigate to the project directory
```bash
cd rick-and-morty-dashboard
```
* Create environment variables
```bash
touch .env
```

* Update the .env file with the API url
```bash
APP_GRAPHQL_ENDPOINT=https://rickandmortyapi.com/graphql
```

* Install dependencies
```bash
pnpm install
```
* Generate type
```bash
pnpm generate:type
```

* Start local development server
```bash
pnpm dev
```

* Use this credentials for login
```bash
username: admin
password: admin
```
