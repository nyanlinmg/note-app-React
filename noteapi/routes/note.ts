import express from "express"
import { prisma } from "../lib/prisma"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { auth } from "../middleware/auth";

export const router = express.Router();

router.get("/notes", async (req, res) => {
    try{
        const notes = await prisma.note.findMany({
           orderBy: {
                createdAt: 'desc'
           },
           include: {user: true}
        })

        return res.status(200).json(notes);
    }catch(error) {
        return res.status(500).json({msg: "Something went wrong"});
    }
});

router.get("/notes/:id", async (req, res) => {
    try{
        const id = await parseInt(req.params.id);

        if(!id){
            return res.status(404).json("Note not found !!!");
        }

        const note = await prisma.note.findUnique({
            where: {id},
            include: {
                user: true,
                tag: true
            }
        });

        return res.status(200).json(note);
    }catch(error){
        return res.status(200).json({msg: "Something went wrong"});
    }
})