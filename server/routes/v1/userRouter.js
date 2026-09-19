const {  createUser, getAllUsers, updateUser, deleteUser } = require("../../controllers/userController");
const protect  = require("../../middlewares/authMiddleware");


const authorizeAdmin = require("../../middlewares/authorizeAdmin");

const userRouter = require("express").Router();

userRouter.use(protect, authorizeAdmin)

userRouter.get("/", getAllUsers)
userRouter.post("/", createUser)
userRouter.put("/:id", updateUser )
userRouter.delete("/:id", deleteUser);


module.exports = userRouter;
