import  express  from "express";

import { VerifyAdmin } from "../Utils/Verifytoken.js";
import { createRole, deleteRole, getRole, getallRole, updateRole } from "../Controllers/role.js";

const router = express.Router();

//Create
router.post("/", VerifyAdmin, createRole);
//Update
router.put("/:id", VerifyAdmin, updateRole);
//Delete
router.delete("/:id", VerifyAdmin, deleteRole);
//Get
router.get("/:id", VerifyAdmin, getRole);
//Getall
router.get("/", VerifyAdmin, getallRole);
export default router