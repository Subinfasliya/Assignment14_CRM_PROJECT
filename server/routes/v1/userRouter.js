const { dashboardController, createUser, getAllUsers, updateUser, deleteUser } = require("../../controllers/userController");

const authenticate = require("../../middlewares/authenticate");
const authorizeAdmin = require("../../middlewares/authorizeAdmin");

const userRouter = require("express").Router();

userRouter.use(authenticate, authorizeAdmin)

// userRouter.get("/dashboard", authenticate, authorizeAdmin, dashboardController);

userRouter.get("/", getAllUsers)
userRouter.post("/", createUser)
userRouter.put("/:id", updateUser )
userRouter.delete("/:id", deleteUser);


module.exports = userRouter;
