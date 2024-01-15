import  express  from "express";
import { createUser, deleteUser, getUser, getallUser, updateUser } from "../Controllers/user.js";
import { VerifyAdmin } from "../Utils/Verifytoken.js";

const router = express.Router();

//Create
router.post("/", createUser);
//Update
router.put("/:id", updateUser);
//Delete
router.delete("/:id", VerifyAdmin, deleteUser);
//Get
router.get("/:id", getUser);
//Getall
router.get("/", getallUser);
export default router