# Project Documentation 
Here's the complete `README.md` content. You can copy and paste it directly into your project's root directory.

```md
# Flowchart Display App

This is a full-stack application that allows users to view and interact with flowcharts. The application includes:

- **FastAPI** backend to handle the Mermaid diagram data storage in **MongoDB**.
- **Vite** + **React** frontend to display the flowcharts using **React Flow**.
- **Nginx** as a reverse proxy for the API and serving the frontend.

## Features

- Upload Mermaid diagrams to MongoDB.
- View and select stored diagrams from a dropdown in the frontend.
- Render selected diagrams as interactive flowcharts.
  
## Project Structure

```bash
project-root/
│
├── backend/                 # FastAPI backend folder
│   ├── app.py               # FastAPI app file
│   ├── requirements.txt     # Python dependencies
│   └── Dockerfile           # Dockerfile for the FastAPI app
│
├── frontend/                # Vite + React frontend folder
│   ├── public/              # Public assets for React
│   ├── src/                 # React source code
│   │   ├── App.jsx          # Main React component
│   │   └── index.jsx        # Entry point for React
│   ├── package.json         # React project configuration
│   ├── Dockerfile           # Dockerfile for the frontend
│
├── nginx/                   # Nginx configuration folder
│   ├── nginx.conf           # Custom Nginx configuration file
│   └── Dockerfile           # Dockerfile for Nginx
│
├── docker-compose.yml        # Docker Compose file for container orchestration
└── README.md                 # Documentation (this file)
```

## Prerequisites

- Docker and Docker Compose installed on your machine.
- Node.js (for development purposes).
- Python 3.7+ (for backend development if not using Docker).

## Installation and Setup

Follow these steps to set up the project on your local machine.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/flowchart-app.git
cd flowchart-app
```

### 2. Build and Run with Docker Compose

Docker Compose will orchestrate the backend (FastAPI), frontend (Vite + React), MongoDB, and Nginx services.

```bash
docker-compose up --build
```

This will build and run all the necessary containers:

- **Backend**: FastAPI will be available on `http://localhost:8000`.
- **Frontend**: React app will be available on `http://localhost:3000`.
- **MongoDB**: Data storage for the diagrams (available internally in the containers).
- **Nginx**: Proxy server on `http://localhost`.

### 3. Access the Application

- **Frontend**: Visit `http://localhost` to access the app.
- **API**: The FastAPI backend can be accessed at `http://localhost/api`.

### 4. Running the App in Development Mode

If you want to develop without Docker, you can run the backend and frontend separately.

#### Backend (FastAPI)

```bash
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
```

#### Frontend (Vite + React)

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`, and the backend at `http://localhost:8000`.

## API Endpoints

| Method | Endpoint          | Description                      |
|--------|-------------------|----------------------------------|
| POST   | `/diagram/`        | Upload a Mermaid diagram         |
| GET    | `/diagrams/`       | Get all stored diagrams          |
| GET    | `/diagram/{title}` | Get a specific diagram by title  |

### Example Request

To upload a Mermaid diagram to the FastAPI backend:

```bash
POST http://localhost:8000/diagram/
Content-Type: application/json

{
  "title": "Sample Diagram",
  "diagram": "flowchart TD; A-->B; B-->C;"
}
```

## File Overview

- **backend/app.py**: The main FastAPI app that handles API requests and interacts with MongoDB.
- **frontend/src/App.jsx**: The main React component that handles rendering flowcharts using `react-flow-renderer`.
- **nginx/nginx.conf**: Custom Nginx configuration that proxies API requests and serves the frontend.

## Technologies Used

- **Frontend**: React, Vite, React Flow
- **Backend**: FastAPI, MongoDB
- **Proxy**: Nginx
- **Containerization**: Docker, Docker Compose

## Future Enhancements

- **Authentication**: Add user authentication to secure diagram uploads and viewing.
- **Automatic Layout**: Implement automatic layout generation for flowcharts to improve the user experience.
- **Styling**: Improve the UI and add better error handling for missing or malformed diagrams.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

---

This `README.md` file covers:

- Project structure
- Installation steps (with and without Docker)
- API endpoints and examples
- Technologies used
- Future enhancements

Make sure to update any sections such as the repository URL or additional customizations as necessary for your project.