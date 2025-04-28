const db = require("../config/db");
const queryGen = require("../helpers/querry");

exports.getAllReviews = (req, res) => {
  db.query("SELECT * FROM review", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getReviewById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM review WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results[0]);
  });
};

exports.createReview = (req, res) => {
  const { stadion_id, user_id, rating, comment } = req.body;
  const sql = `INSERT INTO review (stadion_id, user_id, rating, comment) VALUES (?, ?, ?, ?)`;

  db.query(sql, [stadion_id, user_id, rating, comment], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Review created", reviewId: result.insertId });
  });
};

exports.updateReviewById = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const sql = `UPDATE review SET ${queryGen(data)} WHERE id = ?`;

  db.query(sql, [...Object.values(data), id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Review updated" });
  });
};

exports.deleteReviewById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM review WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Review deleted" });
  });
};