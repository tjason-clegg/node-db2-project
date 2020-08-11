const express = require("express");
const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/car-dealer.db3",
  },
  useNullAsDefault: true,
});

const router = express.Router();

//// GET Requests ////

router.get("/", (req, res) => {
  db("cars")
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to recieve cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .first()
    .then((cars) => {
      res.json(cars);
    })
    .catch((err) => {
      res.status(500).json({ message: "Failed to recieve cars" });
    });
});

//// POST Requests ////

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then((ids) => {
      db("cars")
        .where({ id: ids[0] })
        .then((newCarEntry) => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch((err) => {
      console.log("Error with your POST request", err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

module.exports = router;
