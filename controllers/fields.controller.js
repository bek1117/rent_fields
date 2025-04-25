const db = require("../config/db");
const querryGen = require("../helpers/querry");

exports.getAllFields = (req, res) => {
  db.query("SELECT * FROM fields", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getFieldById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM fields WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results[0]);
  });
};

exports.createField = (req, res) => {
  const { name, location, adress, price_per_hour, owner_id } =
    req.body;
  description = req.body.description || "No description provided";
  const sql = `INSERT INTO fields (name, location, adress, description, price_per_hour, owner_id) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [name, location, adress, description, price_per_hour, owner_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ message: "Field created", fieldId: result.insertId });
    }
  );
};

exports.updateFieldById = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const sql = `UPDATE fields SET ${querryGen(data)} WHERE id=?`;
  db.query(sql, [...Object.values(data), id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Field updated" });
  });
};

exports.deleteFieldById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM fields WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Field deleted" });
  });
};
