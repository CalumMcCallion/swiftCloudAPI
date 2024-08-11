const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database(":memory:");

// Create tables and insert initial data
db.serialize(() => {
  db.run(
    `
        CREATE TABLE IF NOT EXISTS songs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            song TEXT,
            artist TEXT,
            writer TEXT,
            album TEXT,
            year INTEGER,
            plays_june INTEGER,
            plays_july INTEGER,
            plays_august INTEGER
        )
    `,
    (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return;
      }
      console.log("Table created successfully.");
    }
  );

  // Load data from CSV file
  const csvFilePath = path.join(__dirname, "SwiftCloudData.csv");
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      db.run(
        `INSERT INTO songs (song, artist, writer, album, year, plays_june, plays_july, plays_august) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          row["Song"],
          row["Artist"],
          row["Writer"],
          row["Album"],
          parseInt(row["Year"], 10),
          parseInt(row["Plays - June"], 10),
          parseInt(row["Plays - July"], 10),
          parseInt(row["Plays - August"], 10)
        ],
        (err) => {
          if (err) {
            console.error("Error inserting row:", err.message);
          }
        }
      );
    })
    .on("end", () => {
      console.log(
        "CSV file successfully processed and data loaded into the database."
      );
    })
    .on("error", (err) => {
      console.error("Error reading CSV file:", err.message);
    });
});

// Example endpoint
app.get("/", (req, res) => {
  res.send(
    "Welcome to SwiftCloud - The Number #1 app for Taylor Swifties! - Front-end Coming Soon!"
  );
});

// Endpoint to get all songs
app.get("/songs", (req, res) => {
  db.all("SELECT * FROM songs", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Endpoint to get songs by year
app.get("/songs/:year", (req, res) => {
  const year = parseInt(req.params.year, 10);
  db.all("SELECT * FROM songs WHERE year = ?", [year], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Endpoint to get popular songs by month
app.get("/popular/songs", (req, res) => {
  const month = req.query.month;
  let column;

  switch (month) {
    case "june":
      column = "plays_june";
      break;
    case "july":
      column = "plays_july";
      break;
    case "august":
      column = "plays_august";
      break;
    default:
      res
        .status(400)
        .json({ error: "Invalid month. Please use june, july, or august." });
      return;
  }

  db.all(`SELECT * FROM songs ORDER BY ${column} DESC`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Endpoint to search for songs
app.get("/search", (req, res) => {
  const song = req.query.song || "";
  const artist = req.query.artist || "";
  const writer = req.query.writer || "";
  const album = req.query.album || "";

  const query = `
        SELECT * FROM songs
        WHERE song LIKE ?
        AND artist LIKE ?
        AND writer LIKE ?
        AND album LIKE ?
    `;
  const params = [`%${song}%`, `%${artist}%`, `%${writer}%`, `%${album}%`];

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
