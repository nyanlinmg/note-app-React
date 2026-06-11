import express from 'express';

const app =  express();

import cors from 'cors';
app.use(cors());

import {router as tagRouter} from "../routes/tag";
app.use(tagRouter)

app.listen(8800,() => {
    console.log("Api running at port 8800...")
})