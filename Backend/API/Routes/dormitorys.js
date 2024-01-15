import express from "express";

import {
    createDormitory,
    deleteDormitory,
    getDormitory,
    getDormitoryRoom,
    getallDormitory,
    updateDormitory
} from "../Controllers/dormitory.js";
import { VerifyAdmin } from "../Utils/Verifytoken.js";
const router = express.Router();

//Create
router.post("/", VerifyAdmin,  createDormitory);
//Update
router.put("/:id", VerifyAdmin,  updateDormitory);
//Delete
router.delete("/:id", VerifyAdmin,  deleteDormitory);
//Get
router.get("/:id", getDormitory);
//Getall
router.get("/", getallDormitory);
router.get("/room/:id", getDormitoryRoom);

export default router