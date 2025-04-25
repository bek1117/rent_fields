const db = require("../config/db");
const queryGen = require("../helpers/querry");

exports.getAllBookings = (req, res) => {
  db.query("SELECT * FROM booking", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};

exports.getBookingById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM booking WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results[0]);
  });
};

exports.createBooking = (req, res) => {
  const {
    stadion_id,
    user_id,
    booking_date,
    start_time,
    end_time,
    total_price,
    status,
  } = req.body;

  const sql = `INSERT INTO booking (stadion_id, user_id, booking_date, start_time, end_time, total_price, status) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(
    sql,
    [
      stadion_id,
      user_id,
      booking_date,
      start_time,
      end_time,
      total_price,
      status,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res
        .status(201)
        .json({ message: "Booking created", bookingId: result.insertId });
    }
  );
};

exports.updateBookingById = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const sql = `UPDATE booking SET ${queryGen(data)} WHERE id = ?`;
  db.query(sql, [...Object.values(data), id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Booking updated" });
  });
};

exports.deleteBookingById = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM booking WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "Booking deleted" });
  });
};
