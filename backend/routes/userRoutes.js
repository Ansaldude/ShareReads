// const express = require("express");
// const router = express.Router();
// const Users = require('../models/userModels')
// const auth = require('../middleware/auth');
// const UserController = require('../controllers/userControllers')
// const upload = require('../controllers/uploadfile');

// router.post("/register", UserController.adduser)
// router.post("/login", UserController.login)

// router.get("/logincheck", auth, UserController.logincheck)

// router.delete("/del/:id", UserController.delete)
// router.post("/logout", auth, UserController.logout)
// router.put("/upload/:id", [upload], UserController.updates)
// router.get("/finduser", UserController.finduser)
// router.put("/updates/:id",[upload], UserController.update)
// module.exports = router

//====================================================================================

const { registerAdmin } = require('../controllers/userControllers');
const express = require("express");
const router = express.Router();
const Users = require('../models/userModels');
const auth = require('../middleware/auth');
const checkRole = require("../middleware/checkRole");
const UserController = require('../controllers/userControllers');
const upload = require('../controllers/uploadfile');

// Allow buyers to register themselves
router.post("/register", UserController.adduser);

// Allow only admins to register new admins
router.post("/admin/register", auth, checkRole("admin"), registerAdmin);

router.post("/login", UserController.login);
router.get("/logincheck", auth, UserController.logincheck);
router.delete("/del/:id", auth, checkRole("admin"), UserController.deleteUser);
router.post("/logout", auth, UserController.logout);
router.put("/upload/:id", auth, checkRole("buyer"), [upload], UserController.updates);
router.get("/finduser", UserController.finduser);
router.put("/updates/:id", auth, checkRole("buyer"), [upload], UserController.update);

module.exports = router;
