# HomeIndex

A simple, no-auth web app for quickly accessing and managing all your local network addresses. Designed to run inside Docker on your local network.

![Light Mode](https://via.placeholder.com/800x400/f3f4f6/1f2937?text=Light+Mode+Preview)
![Dark Mode](https://via.placeholder.com/800x400/111827/f3f4f6?text=Dark+Mode+Preview)

## Features

- **No accounts, no passwords** — anyone on your local network can view, add, or remove links
- **Add links** with a nickname, URL (IP, hostname, or full URL), and an icon
- **One-click open** — links open in a new tab
- **Dark & Light mode** — auto-detects system preference and remembers your choice
- **Responsive UI** — works on desktop, tablet, and mobile
- **Persistent storage** — links survive container restarts via a mounted volume
- **30 built-in icons** — Font Awesome icons for easy visual identification

## Tech Stack

- **Backend:** Node.js + Express (JSON file persistence)
- **Frontend:** Vanilla HTML/JS + Tailwind CSS (CDN) + Font Awesome (CDN)
- **Container:** Docker / Docker Compose

## Quick Start

### Option 1: Single YAML file (no clone needed)

Save the following as `compose.yml` and run:

```bash
docker compose up -d
```

```yaml
services:
  homeindex:
    build:
      context: https://github.com/Zhujingxi/url-Index.git#main
    container_name: homeindex
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    restart: unless-stopped
```

This automatically pulls the source from GitHub, builds the image, and starts the container.

### Option 2: Clone first

```bash
git clone https://github.com/Zhujingxi/url-Index.git
cd url-Index
docker compose up -d
```

Links are stored in `./data/links.json` on your host machine.

## Build & Run (Manual)

```bash
npm install
npm start
```

The server listens on `0.0.0.0:3000` by default.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT`   | `3000`  | HTTP server port |

## API Endpoints

| Method | Endpoint           | Description       |
|--------|--------------------|-------------------|
| GET    | `/api/links`       | List all links    |
| POST   | `/api/links`       | Add a new link    |
| DELETE | `/api/links/:id`   | Remove a link     |
| GET    | `/api/health`      | Health check      |

## Project Structure

```
url-Index/
├── server.js            # Express server
├── package.json         # Dependencies
├── Dockerfile           # Docker image
├── docker-compose.yml   # Compose config
├── .dockerignore
├── .gitignore
└── public/
    └── index.html       # Frontend app
```

## License

MIT
