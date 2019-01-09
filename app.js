import express from 'express';
import db from './db/db';

import dbBooks from './db/dbBooks';

import bodyParser from 'body-parser';

const app = express();

//Parse incomming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//get all todos

app.get('/api/v1/books', (req, res)=>{
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved success',
        books: dbBooks
    })
});

app.post('/api/v1/books', (req,res)=>{
   
    if(!req.body.author){
        return res.status(400).send({
            success: 'false',
            message: 'author is required'
        });
    }else if(!req.body.title){
        return res.status(400).send({
            success: 'false',
            message: 'title is required'
        });
    }

    const book = {
        id: dbBooks.length + 1,
        author: req.body.author,
        title: req.body.title
    }
    
    dbBooks.push(book);

    return res.status(201).send({
        success: 'true',
        message: 'Book added successfully',
        book
    })
});

app.get('/api/v1/books/:id', (req,res) => {
    
    const id = parseInt(req.params.id, 10);


    dbBooks.map((book)=>{
        if(book.id===id){
            
            return res.status(200).send({
                success: 'true',
                message: 'book retrieved successfully',
                book,
            });

        }

    });

    return res.status(404).send({
        success: 'false',
        message: 'book does not exist',
    });

    
});

app.delete('/api/v1/books/:id',(req,res)=>{
    const id = parseInt(req.params.id, 10);

    dbBooks.map((book,index)=>{
        if(book.id===id){
            dbBooks.splice(index, 1);
            return res.status(200).send({
                success: 'true',
                message: 'Book deleted successfuly',
            });
        }
    });

    return res.status(404).send({
        success: 'false',
        message: 'Book not found',
    });
});

app.put('/api/v1/todos/:id',(req,res)=>{
    const id = parseInt(req.params.id, 10);
    
    let todoFound;
    let itemIndex;

    db.map((todo, index) => {
        if(todo.id === id){
            todoFound = todo;
            itemIndex = index;
        }
    });

    if(!todoFound){
        return res.status(404).send({
            success: 'false',
            message: "todo not found",
        });
    }

    if(!req.body.title){
        return res.status(400).send({
            success: 'false',
            message: 'title is required',
        });
    }else if(!req.body.description){
        return res.status(400).send({
            success: 'false',
            message: 'description is required',
        });
    }

    const updatedTodo = {
        id: todoFound.id,
        title: req.body.title || todoFound.title,
        description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, updatedTodo);

    return res.status(201).send({
        success: 'true',
        message: ' todo updated successfully',
        updatedTodo,
    });




});

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
});