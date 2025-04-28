const db = require("../config/db");
const queryGen = require("../helpers/querry");
const filterGen = require("../helpers/filter");

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
        return res.status(500).send({ message: "Error in creating user" });
      }

      res
        .status(201)
        .send({ message: "User added successfully", userId: result.insertId });
    }
  );
};

const getAllUsers = (req, res) => {
  db.query(`SELECT * FROM users`, (error, result) => {
    if (error) {
      console.error("Error in getting users data:", error);
      return res.status(500).send({ message: "Error in getting users data" });
    }
    res.status(200).send(result);
  });
};

const getUserById = (req, res) => {
  db.query(
    `SELECT * FROM users WHERE id = ?`,
    [req.params.id],
    (error, result) => {
      if (error) {
        console.error("Error in getting user data:", error);
        return res.status(500).send({ message: "Error in getting user data" });
      }
      if (result.length === 0) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send(result[0]);
    }
  );
};

const removeUserById = (req, res) => {
  const { id } = req.params;
  db.query(`DELETE FROM users WHERE id = ?`, [id], (error, result) => {
    if (error) {
      console.error("Error in deleting user:", error);
      return res.status(500).send({ message: "Error in deleting user" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(200).send({ message: "User deleted successfully" });
  });
};

const updateUserById = (req, res) => {
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).send({ message: "No fields provided for update" });
  }

  const updated = queryGen(data);
  const values = [...Object.values(data), req.params.id];

  db.query(
    `UPDATE users SET ${updated} WHERE id = ?`,
    values,
    (error, result) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).send({ message: "Error updating user" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).send({ message: "User not found" });
      }
      res.status(200).send({ message: "User updated successfully" });
    }
  );
};

const getUsersByRole = (req, res) => {
  const { role } = req.body;
  if (!role) {
    return res.status(400).send({ message: "Role is required" });
  }

  db.query(
    `SELECT * FROM users WHERE userRole = ?`,
    [role],
    (error, result) => {
      if (error) {
        console.error("Error in getting users by role:", error);
        return res
          .status(500)
          .send({ message: "Error in getting users by role" });
      }
      res.status(200).send({ data: result });
    }
  );
};

const getUserByData = (req, res) => {
  const data = req.body;
  if (!data || !Object.keys(data).length) {
    return res.status(400).send({ message: "No data provided for filtering" });
  }

  const updated = filterGen(data);
  const values = [...Object.values(data)];

  db.query(`SELECT * FROM users WHERE ${updated}`, values, (error, result) => {
    if (error) {
      console.error("Error in getting user by data:", error);
      return res.status(500).send({ message: "Error in getting user by data" });
    }
    res.status(200).send({ data: result });
  });
};

const getUsersFields = (req, res) => {
  const { first_name, last_name } = req.body;
  if (!first_name || !last_name) {
    return res
      .status(400)
      .send({ message: "First name and last name are required" });
  }

  db.query(
    `
    SELECT u.name, f.name, i.image_url 
    FROM users u
    LEFT JOIN fields f ON u.id = f.owner_id
    LEFT JOIN images i ON f.id = i.stadion_id
    WHERE u.first_name = ? AND u.last_name = ?
    `,
    [first_name, last_name],
    (error, result) => {
      if (error) {
        console.error("Error in getting users fields:", error);
        return res
          .status(500)
          .send({ message: "Error in getting users fields" });
      }
      res.status(200).send({ data: result });
    }
  );
};

const getUserreviews = (req, res) => {
  const { id } = req.body
  if (!id) return res.status(400).send({ messege: "ID is not provided" })
  db.query(
    `
    SELECT r.comment, r.rating, r.stadion_id
    FROM users u
    JOIN review r
    ON
    r.user_id = u.id
    WHERE u.id = ?
    `, [id], (error, result) => {
      if (error) return res.status(500).send({ error: error.message })
      res
        .status(200)
        .send({ data: result })
    }
  );
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
  getUsersByRole,
  getUserByData,
  getUsersFields,
  getUserreviews
};
