# Static Hosting Deployment

## Project Description
>This project is a demo for static hosting deployment on a linux machine using nginx web server.

## Installation
```
git clone https://github.com/AhmedSherif2002/static-host-demo.git
cd static-host-demo
```

Run frontend

```
cd frontend
npm install
npm run dev 
```

Run backend

```
cd backend
npm install
node dist/index.js 
```

# How does it work?

## Frontend

- User enters git repo_url and project name and submits this form to teh backend server.

## Backend

- Make a directory for the application.
- Deploy the application in that directory.
- Map this application to a specific port using nginx.
- send deployment status to the user (Success or Fail) and the port on which the application is accessible by.

