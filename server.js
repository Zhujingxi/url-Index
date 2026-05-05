const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data', 'links.json');

app.use(express.json());
app.use(express.static('public'));

// Ensure data directory exists
if (!fs.existsSync(path.dirname(DATA_FILE))) {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
}

function readLinks() {
  try {
    if (!fs.existsSync(DATA_FILE)) return [];
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    console.error('Error reading links:', e);
    return [];
  }
}

function writeLinks(links) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(links, null, 2));
    return true;
  } catch (e) {
    console.error('Error writing links:', e);
    return false;
  }
}

// Get all links
app.get('/api/links', (req, res) => {
  res.json(readLinks());
});

// Add a link
app.post('/api/links', (req, res) => {
  const { url, name, icon } = req.body;
  if (!url || !name) {
    return res.status(400).json({ error: 'URL and name are required' });
  }

  const links = readLinks();
  const newLink = {
    id: Date.now().toString(),
    url: url.startsWith('http') ? url : `http://${url}`,
    name: name.trim(),
    icon: icon || 'fa-globe',
    createdAt: new Date().toISOString()
  };

  links.push(newLink);
  writeLinks(links);
  res.status(201).json(newLink);
});

// Delete a link
app.delete('/api/links/:id', (req, res) => {
  const links = readLinks();
  const filtered = links.filter(l => l.id !== req.params.id);

  if (filtered.length === links.length) {
    return res.status(404).json({ error: 'Link not found' });
  }

  writeLinks(filtered);
  res.json({ success: true });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`HomeIndex running on http://0.0.0.0:${PORT}`);
});
