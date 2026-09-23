const {  createUser, getAllUsers, updateUser, deleteUser } = require("../../controllers/userController");
const protect  = require("../../middlewares/authMiddleware");
const authorizeRoles = require("../../middlewares/authorizeRoles");

const validationError = require("../../middlewares/validationError");
const {
	createUserValidation,
	updateUserValidation,
} = require("../../validations/userValidation");

const userRouter = require("express").Router();

userRouter.use(protect, authorizeRoles("admin"))

userRouter.get("/", getAllUsers)
userRouter.post("/", createUserValidation, validationError, createUser)
userRouter.put("/:id", updateUserValidation, validationError, updateUser)
userRouter.delete("/:id", deleteUser);


module.exports = userRouter;
