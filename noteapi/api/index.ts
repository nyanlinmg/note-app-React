import express from 'express';

const app =  express();

import cors from 'cors';
app.use(cors());

app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

import {router as tagRouter} from "../routes/tag";
app.use(tagRouter)

import { router as userRouter} from "../routes/user";
app.use(userRouter);

import { router as noteRouter } from "../routes/note";
app.use(noteRouter)

app.listen(8800,() => {
    console.log("Api running at port 8800...")
})