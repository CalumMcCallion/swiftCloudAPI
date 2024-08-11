const request = require("supertest");
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const csv = require("csv-parser");
const path = require("path");

const app = express();
app.use(cors());

//in-memory SQLite database setup
const db = new sqlite3.Database(":memory:");

//create tables and inserts initial data
db.serialize(() => {
  db.run(`
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
  `);

  //inserts sample data
  db.run(
    `INSERT INTO songs (song, artist, writer, album, year, plays_june, plays_july, plays_august) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      "Love Story",
      "Taylor Swift",
      "Taylor Swift",
      "Fearless",
      2008,
      100,
      150,
      200
    ]
  );
});

app.get("/", (req, res) => {
  res.send(
    "Welcome to SwiftCloud - The Number #1 app for Taylor Swifties! - Front-end Coming Soon!"
  );
});

app.get("/songs", (req, res) => {
  db.all("SELECT * FROM songs", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

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

describe("SwiftCloud API Tests", () => {
  it("should return a welcome message", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toBe(
      "Welcome to SwiftCloud - The Number #1 app for Taylor Swifties! - Front-end Coming Soon!"
    );
  });

  it("should return all songs", async () => {
    const response = await request(app).get("/songs");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          song: "Love Story",
          artist: "Taylor Swift"
        })
      ])
    );
  });

  it("should return songs by year", async () => {
    const response = await request(app).get("/songs/2008");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          year: 2008
        })
      ])
    );
  });

  it("should return popular songs for a specific month", async () => {
    const response = await request(app).get("/popular/songs?month=june");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          plays_june: expect.any(Number)
        })
      ])
    );
  });

  it("should return error for invalid month", async () => {
    const response = await request(app).get("/popular/songs?month=invalid");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Invalid month. Please use june, july, or august."
    });
  });

  it("should search for songs", async () => {
    const response = await request(app).get("/search?song=Love Story");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          song: "Love Story"
        })
      ])
    );
  });
});
