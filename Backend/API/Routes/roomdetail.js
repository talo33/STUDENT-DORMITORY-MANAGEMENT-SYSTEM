import  express  from "express";
import { deleteRoomDetails, createRoomDetails, updateRoomDetails, getRoomDetail, getallRoomDetails } from "../Controllers/roomdetails.js";
import { VerifyAdmin,VerifyUser  } from "../Utils/Verifytoken.js";

const router = express.Router();

//Create
//add sv vào room
router.post("/", createRoomDetails);
//Update
router.put("/:id", VerifyAdmin,  updateRoomDetails);
//Delete
router.delete("/:id", VerifyAdmin, deleteRoomDetails);
//Get
router.get("/:id",VerifyAdmin, getRoomDetail);
//Getall
router.get("/",VerifyAdmin, getallRoomDetails);

// //Checkout Room
// router.post("/:roomId", VerifyUser, checkoutRoom);

export default router