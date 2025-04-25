const db = require("../config/db");
const queryGen = require("../helpers/querry");

exports.getAllImages = (req, res) => {
  db.query("SELECT * FROM images", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getImageById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM images WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results[0]);
  });
};

exports.getImagesByStadionId = (req, res) => {
  const { stadion_id } = req.params;
  db.query(
    "SELECT * FROM images WHERE stadion_id = ?",
    [stadion_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(results);
    }
  );
};

exports.createImage = (req, res) => {
  const { stadion_id, image_url } = req.body;
  const sql = "INSERT INTO images (stadion_id, image_url) VALUES (?, ?)";

  db.query(sql, [stadion_id, image_url], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Image uploaded", imageId: result.insertId });
  });
};

exports.updateImageById = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const sql = `UPDATE images SET ${queryGen(data)} WHERE id = ?`;

  db.query(sql, [...Object.values(data), id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Image updated" });
  });
};

exports.deleteImageById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM images WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Image deleted" });
  });
};
