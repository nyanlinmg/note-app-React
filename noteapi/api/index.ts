import express from 'express';

const app =  express();

import cors from 'cors';
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import {router as tagRouter} from "../routes/tag";
app.use(tagRouter)

import { router as userRouter} from "../routes/user";
app.use(userRouter);

app.listen(8800,() => {
    console.log("Api running at port 8800...")
})