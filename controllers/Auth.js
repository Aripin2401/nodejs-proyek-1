import User from '../models/UserModel.js';
import argon2 from 'argon2';

export const Login = async (req, res) => {
    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({ msg: "User Tidak Ditemukan"});
    const match = await argon2.verify(user.password, req.body.password);
    if(!match) return res.status(400).json({ msg: "Salah Password" });
    req.session.userId = user.uuid;
    const uuid = user.userId;
    const name = user.name;
    const email = user.email;
    const role = user.role;
    res.status(200).json({msg: "Berhasil Masuk"});
}

export const Me = async (req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "You should Login"});
    }
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(404).json({ message: "Password does not match" });
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err) =>{
        if(err) return res.status(400).json({msg: "Something Bad Happend"});
        res.status(200).json({msg: "You has been Logout"});
    })
}