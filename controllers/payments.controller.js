const db = require("../config/db");
const queryGen = require("../helpers/querry");

exports.getAllPayments = (req, res) => {
  db.query("SELECT * FROM payment", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getPaymentById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM payment WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results[0]);
  });
};

exports.createPayment = (req, res) => {
  const { booking_id, amount, payment_time, payment_methods } = req.body;

  const sql = `INSERT INTO payment (booking_id, amount, payment_time, payment_methods) VALUES (?, ?, ?, ?)`;
  db.query(
    sql,
    [booking_id, amount, payment_time, payment_methods],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ message: "Payment recorded", paymentId: result.insertId });
    }
  );
};

exports.updatePaymentById = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const sql = `UPDATE payment SET ${queryGen(data)} WHERE id = ?`;
  db.query(sql, [...Object.values(data), id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Payment updated" });
  });
};

exports.deletePaymentById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM payment WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Payment deleted" });
  });
};
