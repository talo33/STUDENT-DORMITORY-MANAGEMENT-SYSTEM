import Admin from "../Models/Admin.js";
import Room from "../Models/Room.js";

//Create
export const createAdmin = async (req, res, next) => {
    const newAdmin = new Admin(req.body)
    try {
        const savedAdmin = await newAdmin.save()
        res.status(200).json(savedAdmin)
    } catch (err) {
        next(err)
    }
}
//Update
export const updateAdmin = async (req, res, next) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Delete
export const deleteAdmin = async (req, res, next) => {
    try {
        await Admin.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Delete Success");
    } catch (error) {
        res.status(500).json(error);
    }
}
//Get
export const getAdmin = async (req, res, next) => {
    try {
        const Admin = await Admin.findById(
            req.params.id
        );
        res.status(200).json(Admin);
    } catch (error) {
        res.status(500).json(error);
    }
}
//Getall
export const getallAdmin = async (req, res, next) => {
    try {
        const Admins = await Admin.find();
        res.status(200).json(Admins);
    } catch (err) {
        next(err);
    }
}