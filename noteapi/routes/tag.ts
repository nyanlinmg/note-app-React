import express from 'express';
import { prisma } from '../lib/prisma';
import { auth } from '../middleware/auth';

export const router = express.Router();

router.get("/tags", async (req, res) => {
    const tags = await prisma.tag.findMany({
        include: {
            notes: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }    
    })

    if(!tags){
        return res.status(404).json({msg: "Tags not found"});
    }

    return res.status(200).json(tags);
})