import express from 'express';
import db from '../db/db';

const router = express.Router();

router.get('/api/v1/todos',(req,res)=>{
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db,
    });
});