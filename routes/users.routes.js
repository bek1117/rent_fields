const {
  createUser,
  getAllUsers,
  getUserById,
  removeUserById,
  updateUserById,
  getUsersByRole,
  getUserByData,
  getUsersFields,
  getUserreviews
} = require("../controllers/user.controller");
const router = require("express").Router()

router.post('/', createUser)
router.get("/", getAllUsers);
router.get("/getUsers", getUsersByRole)
router.get("/getUsers/data", getUserByData);
router.get("/userfields", getUsersFields)
router.get("/reviews", getUserreviews)
router.get("/:id", getUserById);
router.delete("/:id", removeUserById);
router.patch("/:id", updateUserById);

module.exports = router