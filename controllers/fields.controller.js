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

exports.getFieldOwner = (req, res) => {
  const { id } = req.params;

  db.query(
    `
    SELECT 
      f.name AS field_name,
      CONCAT(u.first_name, ' ', u.last_name) AS owner_name
    FROM 
      fields f
    LEFT JOIN 
      users u ON u.id = f.owner_id
    WHERE 
      f.id = ?
    `,
    [id],
    (error, result) => {
      if (error) {
        console.error("Error fetching field and owner:", error);
        return res
          .status(500)
          .send({ message: "Server error while fetching field and owner" });
      }

      if (result.length === 0) {
        return res.status(404).send({ message: "Field not found" });
      }

      res.status(200).send({ data: result[0] });
    }
  );
};

exports.getfielsdwithBookingTime = (req, res) => {
  const { minPrice, maxPrice } = req.body;

  db.query(
    `
    SELECT 
        f.name AS field_name,
        f.price_per_hour,
        b.booking_date,
        b.start_time,
        b.end_time,
        TIMESTAMPDIFF(HOUR, b.start_time, b.end_time) AS booking_duration
    FROM 
        fields f
    JOIN 
        booking b ON b.stadion_id = f.id
    WHERE 
        f.price_per_hour BETWEEN ? AND ?
        AND TIMESTAMPDIFF(HOUR, b.start_time, b.end_time) > 2
    ORDER BY 
        b.booking_date;
    `,
    [minPrice, maxPrice],
    (error, result) => {
      if (error) {
        console.error("Error fetching fields and bookings:", error);
        return res
          .status(500)
          .send({ message: "Server error fetching fields and bookings" });
      }
      res.status(200).send({ data: result });
    }
  );
};
