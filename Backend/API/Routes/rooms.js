import express from 'express';
import {
  createRoom,
  deleteRoom,
  getAllChangeRoomRequest,
  getAllCheckoutRequest,
  getAllExtendRoomRequest,
  getAllFixRoomRequest,
  getChangeRoomRequest,
  getCheckoutRequest,
  getExtendRoomRequest,
  getFixRoomRequest,
  getRoom,
  getallRoom,
  requestChangeRoom,
  requestCheckout,
  requestExtend,
  requestFixRoom,
  updateChangeRoomRequest,
  updateCheckoutRequest,
  updateExtendRequest,
  updateFixRequest,
  updateRoom,
  updateRoomavAilability
} from '../Controllers/room.js';
import { VerifyAdmin, VerifyUser } from '../Utils/Verifytoken.js';

const router = express.Router();

// Get
router.get('/', getallRoom);
router.get('/checkout', getAllCheckoutRequest);
router.get('/checkout/:userId', getCheckoutRequest);
router.get('/change-room', VerifyAdmin, getAllChangeRoomRequest);
router.get('/change-room/:userId', getChangeRoomRequest);
router.get('/extend', getAllExtendRoomRequest);
router.get('/extend/:userId', getExtendRoomRequest);
router.get('/fix', getAllFixRoomRequest);
router.get('/fix/:userId', getFixRoomRequest);
router.get('/:id', getRoom);

//Create
router.post('/', VerifyAdmin, createRoom);
router.post('/checkout', requestCheckout);
router.post('/change-room', requestChangeRoom);
router.post('/extend', requestExtend);
router.post('/fix', requestFixRoom);

//Update
router.put('/availability/:id', VerifyAdmin, updateRoomavAilability);
router.put('/checkout/:id', VerifyAdmin, updateCheckoutRequest);
router.put('/change-room/:id', VerifyAdmin, updateChangeRoomRequest);
router.put('/extend/:id', VerifyAdmin, updateExtendRequest);
router.put('/fix/:id', VerifyAdmin, updateFixRequest);
router.put('/:id', VerifyAdmin, updateRoom);

//Delete
router.delete('/:id/:dormitoryId', VerifyAdmin, deleteRoom);

export default router;
