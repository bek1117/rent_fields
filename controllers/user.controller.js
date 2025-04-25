const db = require("../config/db");
const querryGen = require("../helpers/querry");

const createUser = (req, res) => {
  const { first_name, last_name, email, password, phone, userRole } = req.body;

  if (!first_name || !last_name || !email || !password || !phone || !userRole) {
    return res.status(400).send({ message: "All fields are required" });
  }

  db.query(
    `INSERT INTO users (first_name, last_name, email, password, phone, userRole) VALUES (?, ?, ?, ?, ?, ?)`,
    [first_name, last_name, email, password, phone, userRole],
    (error, result) => {
      if (error) {
        console.error("Error in creating user:", error);
        return res.status(500).send({ message: "Error in server" });
      }

      res
        .status(201)
        .send({ message: "User added successfully", userId: result.insertId });
    }
  );
};

const getAllUsers = (req, res) => {
  db.query(`SELECT * FROM users`, (err, result) => {
    if (err) {
      console.error("Error in getting users data:", err);
      return res.status(500).send("Error in getting users data");
    }
    res.send(result);
  });
};

const getUserById = (req, res) => {
  db.query(
    `SELECT * FROM users WHERE id = ?`,
    [req.params.id],
    (err, result) => {
      if (err) {
        console.error("Error in getting user data:", err);
        return res.status(500).send("Error in getting user data");
      }
      if (result.length === 0) {
        return res.status(404).send({ message: "User not found" });
      }
      res.send(result[0]);
    }
  );
};

const removeUserById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM users WHERE id = ?`, [id], (error, result) => {
    if (error) {
      return res.status(500).send("Error in deleting user");
    }
    res.status(200).send({ message: "User deleted successfully" });
  });
};

const updateUserById = (req, res) => {
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).send({ message: "No fields provided for update" });
  }

  const updated = querryGen(data);
  const values = [...Object.values(data), req.params.id];

  db.query(
    `UPDATE users SET ${updated} WHERE id = ?`,
    values,
    (error, result) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).send("Error updating user");
      }
      res.status(200).send({ message: "User updated successfully" });
    }
  );
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
};
