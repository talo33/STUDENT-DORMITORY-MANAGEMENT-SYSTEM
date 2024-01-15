import express from 'express';
import { VerifyAdmin } from '../Utils/Verifytoken.js';
import { createHD, getStudentBill, getallHD, getBillDetail, updateHD, updateHDCT } from '../Controllers/hoadon.js';

const router = express.Router();

//Create HD
router.post('/', createHD);
//Update
router.put('/:id', updateHD);
// router.put('/:id', updateHDCT);
//Delete
// router.delete("/:id", VerifyAdmin);
//Get
router.get('/student/:cmnd', getStudentBill);
//Getall
router.get('/', getallHD);
router.get('/:id', getBillDetail);

export default router;
