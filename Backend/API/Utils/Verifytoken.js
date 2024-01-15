import Accounts from '../Models/Account.js';
import Jwt from 'jsonwebtoken';
import { createError } from '../Utils/Error.js';
// import { ObjectId } from "mongodb";
import Role from '../Models/Role.js';
import httpStatus from 'http-status';

export const Verifytoken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, 'you are not authenticated!'));
  }
  Jwt.verify(token, process.env.Jwt, (err, account) => {
    if (err) return next(createError(403, 'Token is not valid!'));
    req.account = account;
    next();
  });
};

export const VerifyUser = (req, res, next) => {
  Verifytoken(req, res, next, () => {
    if (req.account.id === req.param.id) {
      next();
    } else {
      if (err) return next(createError(403, 'you are not authorized'));
    }
  });
};

export const VerifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: 'You are not authenticated!' });
  }

  Jwt.verify(token, process.env.Jwt, (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: 'Token is not valid!' });
    }

    const { RoleId } = decodedToken;

    if (RoleId === process.env.ADMIN_ROLE_ID) {
      next();
    } else {
      return res.status(403).json({ message: 'User does not have admin privileges' });
    }
  });
};

// export const VerifyAdmin = async (req, res, next) => {
//   const { CMND } = req.body;

//   try {
//     // Kiểm tra xem người dùng có tồn tại không
//     const account = await Accounts.findOne({ CMND }).populate('RoleId');

//     console.log(account);

//     if (!account) {
//       return res.status(401).json({ message: 'User not found' });
//     }

//     if (!account.RoleId) {
//       return res.status(httpStatus.BAD_REQUEST).json({ message: 'Account does not have role' });
//     }

//     const role = await Role.findOne({ _id: account.RoleId });

//     // Kiểm tra quyền của người dùng
//     Verifytoken(req, res, next, async () => {
//       if (account.RoleId) {
//         if (role && role.role === 'admin') {
//           // Nếu có quyền admin, cho phép tiếp tục
//           console.log("Account's role: ", role.role);
//           next();
//         } else {
//           return res.status(403).json({ message: 'User does not have admin privileges' });
//         }
//       } else {
//         return res.status(403).json({ message: 'User does not have a role assigned' });
//       }
//     });
//   } catch (error) {
//     console.error('Error in VerifyAdmin middleware:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const VerifyAdmin = async (req, res, next) => {
//     try {
//         // Kiểm tra xem người dùng có tồn tại không
//         const account = await Accounts.findOne( {CMND: req.body.CMND} );

//         if (!account) {
//             return res.status(401).json({ message: 'User not found' });
//         }

//         // Kiểm tra quyền của người dùng
//         if (account.RoleId) {
//             const role = await Roles.findById(account.RoleId);

//                 if (role && role.role ==='admin') {
//                     // Nếu có quyền admin, cho phép tiếp tục
//                     next();
//                 } else {
//                     return res.status(403).json({ message: 'User does not have admin privileges' });
//                 }

//         } else {
//             return res.status(403).json({ message: 'User does not have a role assigned' });
//         }
//     } catch (error) {
//         console.error('Error in VerifyAdmin middleware:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };
