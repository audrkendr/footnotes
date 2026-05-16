# Footnotes, Track Your Tracks

[![Version](https://img.shields.io/badge/version-1.4.0-blue.svg)](https://semver.org)

## Project Overview

> This is a small web app that shows users their most listened to song from each month using the Spotify API. It intends to visualize the changes in a person's music taste throughout the year. Personally, listening to song that was a favorite in a certain month leads me to remember things that happened as well. Hopefully, this can bring some good times to mind.

<img width="830" height="376" alt="Screenshot 2026-04-02 211620" src="https://github.com/user-attachments/assets/56e0f040-1762-4a28-9bb8-a249d8e238b1" />

---

## Tech Stack

| Category          | Technology                |
| :---------------- | :------------------------ |
| Backend           | Python, FastAPI, Spotipy  |
| Frontend          | React, Vite, Tailwind CSS |
| Core Engine / API | Spotify Web API           |

---

## Getting Started

### Prerequisites

Make sure you have the following:

- **A Spotify Account** (Premium is not strictly required, but you need an active history for top tracks)
- **[Node.js]([https://nodejs.org/en])** (v18.0.0 or higher recommended for Vite)
- **[Python](https://www.python.org/)** (v3.9 or higher recommended)
- **[A Spotify Developer Account]([https://developer.spotify.com/])** to obtain your Client ID and Client Secret

---

## Installation and Setup

Clone this repository and follow these steps to get your environment running locally.

### 1. Backend Setup (`FastAPI`)

Navigate to the backend directory:

```bash
cd [backend-folder-name]
cd backend
```

Create and activate a virtual environment:

**Windows:**

```bash
python -m venv venv
venv\Scripts\activate
```

**macOS/Linux:**

```bash
python3 -m venv venv
source venv/bin/activate
```

Install the required dependencies:

```bash
pip install fastapi uvicorn spotipy
```

> Note on Credentials: The credentials (CLIENT_ID and CLIENT_SECRET) are currently hardcoded inside main.py. For a production deployment, make sure to add your http://127.0.0.1:8000/callback URL to your Redirect URIs in your Spotify Developer Dashboard settings.

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

The backend should now be running at `http://127.0.0.1:8000`.
You can verify it by visiting http://127.0.0.1:8000/ in your browser.

---

## 2. Frontend Setup (`React + Vite`)

Open a new terminal window and navigate to the frontend directory:

```bash
cd frontend
```

Install the dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the application:
The terminal will provide a local URL (typically http://localhost:5173). Open this link in your browser to start generating product prototypes!

---

## Contributing and Community

Whether you want to fix a bug, propose a new UI layout, or add a pre-configured persona template, your contributions are incredibly welcome!

1. **Fork** the Project (▶️ Fork)

2. **Create** your Feature Branch (`git checkout -b feature/NewFeature`)

3. **Commit** your Changes (`git commit -m 'Add some NewFeature`)

4. **Push** to the Branch (`git push origin feature/NewFeature`)

5. **Open** a Pull Request

Have ideas on how to make this tool better for developers? Open an issue or reach out to me directly on [LinkedIn](https://www.linkedin.com/in/akendr/).
