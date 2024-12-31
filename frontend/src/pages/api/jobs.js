import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(':memory:', (err) => {
  if (err) console.error('Database error:', err);
  else {
    console.log('🚀 Connected to SQLite database.');
    db.run(
      'CREATE TABLE IF NOT EXISTS jobs (id INTEGER PRIMARY KEY, title TEXT, description TEXT)'
    );
  }
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    db.all('SELECT * FROM jobs', [], (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(rows);
    });
  } else if (req.method === 'POST') {
    const { title, description } = req.body;
    db.run(
      'INSERT INTO jobs (title, description) VALUES (?, ?)',
      [title, description],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, title, description });
      }
    );
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
