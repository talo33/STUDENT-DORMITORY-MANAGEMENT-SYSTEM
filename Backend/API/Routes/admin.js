import  express  from "express";
import { createAdmin, deleteAdmin, getAdmin, getallAdmin, updateAdmin } from "../Controllers/admin.js";
import { VerifyAdmin } from "../Utils/Verifytoken.js";

const router = express.Router();

//Create
router.post("/", VerifyAdmin, createAdmin);
//Update
router.put("/:id", VerifyAdmin, updateAdmin);
//Delete
router.delete("/:id", VerifyAdmin, deleteAdmin);
//Get
router.get("/:id", VerifyAdmin, getAdmin);
//Getall
router.get("/", VerifyAdmin, getallAdmin);
export default router