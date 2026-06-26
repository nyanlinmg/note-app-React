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

router.delete('/remove_note/:id', async(req, res) => {
    try{
        const id = Number(req.params.id);

        const remove_note = await prisma.note.update({
            where: {id},
            data: {
                remove: true
            }
        });

        return res.status(200).json(remove_note);
    }catch(error){
        return res.status(500).json({msg: "Something went wrong"});
    }
})

router.delete('/delete_note/:id', async(req, res) => {
    try{
        const id = Number(req.params.id);

        const delete_note = await prisma.note.delete({
            where: {id}
        });

        return res.status(200).json(delete_note);

    }catch(error) {
        return res.status(500).json({msg: "Something went wrong"});
    }
})

router.post('/add_note', auth, async(req, res) => {
    try{
        const {id} = res.locals.user;
        const {title, content, tag} = req.body;

        if(!title || !content || !tag){
            return res.status(400).json({msg: "fill the required input"});
        }

        const new_note = await prisma.note.create({
            data: {
                titles: title,
                contents: content,
                userId: id,
                tagId: tag
            }
        })

        return res.status(200).json(new_note);

    }catch(error){
        return res.status(500).json({msg: "Something went wrong"});
    }
})

router.get("/note_detail/:id", async (req, res) => {
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