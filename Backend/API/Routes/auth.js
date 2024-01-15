import express from 'express';
import { deleteAccount, login, register, updateAccount } from '../Controllers/auth.js';
import { VerifyAdmin, VerifyUser, Verifytoken } from '../Utils/Verifytoken.js';
import { celebrate, Joi, Segments } from 'celebrate';
const router = express.Router();

// const registerValidationSchema = celebrate({
//     [Segments.BODY]: Joi.object({
//         MatKhau: Joi.string()
//             .pattern(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&*!])[0-9a-zA-Z@#$%^&*!]{6,}$/)
//             .required().max(12),
//         // Thêm các trường khác vào đây nếu cần thiết
//     }),
// });

router.get('/checkauth', Verifytoken, (req, res, next) => {
  res.send('you are logged in');
});
router.get('/checkuser/:id', VerifyUser, (req, res, next) => {
  res.send('you are logged in user');
});
router.get('/checkadmin', VerifyAdmin, (req, res, next) => {
  res.send('you are logged in admin account');
});

var registerValidationSchema = {
  // Nếu dùng req.body thì dùng Segments.BODY
  [Segments.BODY]: Joi.object().keys({
    CMND: Joi.string().required(),
    MatKhau: Joi.string()
      .regex(/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[@#$%^&*!])[0-9a-zA-Z@#$%^&*!]{6,}$/)
      .required(), // Nếu yêu cầu phaỉ có MatKhau hay các trường khác thì để .required()
    RoleId: Joi.string()
  })
};
router.post('/register', celebrate(registerValidationSchema), register);
router.post('/login', login);
router.delete('/account/:id', VerifyAdmin, deleteAccount);
router.put('/account/:accountId', updateAccount);

export default router;
