import Accounts from '../Models/Account.js';
import bcrypt from 'bcryptjs';
import { createError } from '../Utils/Error.js';
import jwt from 'jsonwebtoken';
import User from '../Models/User.js';
import Role from '../Models/Role.js';

//register
export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(req.body.MatKhau, salt);
    const newAccount = new Accounts({
      CMND: req.body.CMND,
      MatKhau: hash,
      RoleId: req.body.RoleId
    });
    await newAccount.save();
    res.status(201).json({ id: newAccount._id });
  } catch (err) {
    next(err);
  }
};
//login
export const login = async (req, res, next) => {
  try {
    const account = await Accounts.findOne({ CMND: req.body.CMND });
    if (!account) return next(createError(404, 'Không tìm thấy thông tin CMND!'));

    const isPasswordCorrect = await bcrypt.compare(req.body.MatKhau, account.MatKhau);
    if (!isPasswordCorrect) return next(createError(400, 'Sai mật khẩu!'));
    const role = await Role.findOne({ _id: account.RoleId });

    const token = jwt.sign({ id: account._id, CMND: account.CMND, RoleId: account.RoleId }, process.env.JWT, {
      expiresIn: '24h'
    });
    const { MatKhau, RoleId, CMND, _id } = account._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true
      })
      .status(201)
      .json({ details: { CMND, MatKhau, _id, RoleId }, role });
  } catch (err) {
    next(err);
  }
};

export const deleteAccount = async (req, res, next) => {
  try {
    const accountId = req.params.id;

    const account = await Accounts.findById(accountId);

    if (!account) {
      return res.status(404).json({ message: 'Account not found' });
    }

    await Accounts.findByIdAndDelete(accountId);

    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params; // Lấy accountId từ tham số URL
    const { oldPassword, newPassword } = req.body; // Lấy mật khẩu cũ và mới từ body request

    // Kiểm tra xem có thông tin đầy đủ hay không
    if (!accountId || !oldPassword || !newPassword) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Tìm kiếm tài khoản trong cơ sở dữ liệu
    const account = await Accounts.findById(accountId);

    // Kiểm tra xem tài khoản có tồn tại hay không
    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // Kiểm tra xác thực mật khẩu cũ
    const isPasswordValid = bcrypt.compareSync(oldPassword, account.MatKhau);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid old password' });
    }

    // Tạo mật khẩu mới và cập nhật vào cơ sở dữ liệu
    const newSalt = bcrypt.genSaltSync(12);
    const newHash = bcrypt.hashSync(newPassword, newSalt);

    account.MatKhau = newHash;
    await account.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    next(err);
  }
};
