import User from "./../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ["uuid", "name", "email", "role"]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            attributes: ["uuid", "name", "email", "role"],
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confPassword , role } = req.body;
    if (password !== confPassword) return res.status(400).json({ message: "Password does not match" });
    const hashedPassword = await argon2.hash(password);
    try {
        await User.create({
            name : name,
            email : email,
            password: hashedPassword,
            role : role
        });
        res.status(201).json({ message: "User created successfully" });
    } catch {
        res.status(400).json(error);
    }
}

export const updateUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id,
        }
    });
    if(!user) return res.status(404).json({ message: "User not found" });
    const { name, email, password, confPassword , role } = req.body;
    let hashedPassword;
    if (password === "" || confPassword === null) {
        hashedPassword = user.password;
    } else {
        hashedPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ message: "Password does not match" });
    try {
        await User.update({
            name : name,
            email : email,
            password: hashedPassword,
            role : role
        },{
            where :{
                id : user.id
            }
        }
        );
        res.status(201).json({ message: "User update successfully" });
    } catch {
        res.status(400).json(error);
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id,
        }
    });
    if (!user) return res.status(400).json({ message: "Password does not match" });
    try {
        await User.destroy({
            where :{
                id : user.id
            }
        }
        );
        res.status(201).json({ message: "User delete successfully" });
    } catch {
        res.status(400).json(error);
    }
}