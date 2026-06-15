import express from "express"
import { prisma } from "../lib/prisma"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const router = express.Router();

router.get('/users', async (req, res) => {
    try{
        const users = await prisma.user.findMany({
            include: {
                notes: true
            }
        })

        return  res.status(200).json(users);
    }catch(error) {
        return res.status(500).json({msg: "something went wrong"});
    }


})

router.post("/user/login", async(req, res) => {
    try{

        const email = req.body?.email;
        const password = req.body?.password;

        if(!email || !password) {
            return res.status(400).json({msg: "email and password are required"});
        }

        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(user){
            if(await bcrypt.compare(password, user.password)){
                const token = jwt.sign(
                    {id: user.id},
                    process.env.JWT_SECRET as string
                )

                return res.status(200).json({user,token})
            }
        }else {
            return res.status(404).json("user not found");
        }

    }catch(error) {
        return res.status(500).json("something went wrong");
    }
})