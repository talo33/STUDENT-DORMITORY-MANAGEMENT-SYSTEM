import Role from "../Models/Role.js";

//Create
export const createRole = async (req, res, next) => {
    const newRole = new Role(req.body)
    try {
        const savedRole = await newRole.save()
        res.status(200).json(savedRole)
    } catch (err) {
        next(err)
    }
}
//Update
export const updateRole = async (req, res, next) => {
    try {
        const updatedRole = await Role.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRole);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Delete
export const deleteRole = async (req, res, next) => {
    try {
        await Role.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Delete Success");
    } catch (error) {
        res.status(500).json(error);
    }
}
//Get
export const getRole = async (req, res, next) => {
    try {
        const Role = await Role.findById(
            req.params.id
        );
        res.status(200).json(Role);
    } catch (error) {
        res.status(500).json(error);
    }
}
//Getall
export const getallRole = async (req, res, next) => {
    try {
        const Roles = await Role.find();
        res.status(200).json(Roles);
    } catch (err) {
        next(err);
    }
}