import express from "express"
import { prisma } from "../lib/prisma"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { auth } from "../middleware/auth";

export const router = express.Router();

router.get('/users/verify', auth, async(req, res) => {
    const {id} = res.locals.user;
    const user = await prisma.user.findUnique({
        where: {id}
    });

    return res.json(user);
})

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

router.post('/users/register', async(req, res) => {
    try{
        const {name, email, password, phone, image} = req.body;

        const checkUser = await prisma.user.findUnique({
            where: {email}
        });

        if(!name || !email || !password) {
            return res.status(400).json("Fill the required input");
        }

        if(password.length < 8) {
            return res.status(400).json("Password must be at least 8 characters");
        }

        if(checkUser){
            return res.status(400).json("Email is already in use");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                phone: phone || null,
                image: image || null
            }
        })

        return res.status(201).json(
            {
                success: "User registered successfully", data
            }
        )

    }catch(error){
        return res.status(500).json("something went wrong (internal server error)");
    }
})

router.post("/users/login", async(req, res) => {
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