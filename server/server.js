require('dotenv').config();
const http = require('http');
const url = require('url');
const { handlePlaylistArtists, handleGigsByPlaylist } = require('./handlers');

const PORT = process.env.PORT || 3010;

class Router {
  constructor() {
    this.routes = {};
  }

  add(method, path, handler) {
    method = method.toUpperCase();
    if (!this.routes[method]) {
      this.routes[method] = {};
    }
    this.routes[method][path] = handler;
  }

  handle(req, res) {
    const parsedUrl = url.parse(req.url, true);
    const method = req.method.toUpperCase();
    const pathname = parsedUrl.pathname;
    console.log(method, pathname);

    const handler = this.routes[method]?.[pathname] || null;
    console.log(handler);
    if (handler) {
      handler(req, res, parsedUrl.query);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  }
}

const router = new Router();

// Register routes
router.add('GET', '/playlistArtists', handlePlaylistArtists);
router.add('GET', '/gigsByPlaylist', handleGigsByPlaylist);

const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  router.handle(req, res);
});

function start() {
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

module.exports = { start };



