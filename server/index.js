const express = require("express");
const app = express();
const cors = require("cors");
const port = 5500;
const pool = require("./db");

// middleware
app.use(cors())
app.use(express.json())



// get all todo 
app.get("/todos", async (req, res) => {
    try {
        const allTodo = await pool.query("SELECT * FROM todo");
        res.json(allTodo.rows)
    } catch (err) {
        console.log(err)
    }
})

// get todo by ID
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
        res.json(todo.rows[0]);

    } catch (err) {
        console.log(err)
    }
})

// insert a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const addedOn = new Date().toISOString()
        const newTodo = await pool.query("INSERT INTO todo (description,added) VALUES($1, $2) RETURNING *", [description, addedOn])
        res.json(newTodo)
    } catch (err) {
        console.log(err)
    }
})


// update a todo
app.patch("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id])
        res.json(`todo id:${id} was updated!`)

    } catch (err) {
        console.log(err)
    }
})

// delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM todo WHERE id = $1", [id]);
        res.json(`to id:${id} is deleted.`)

    } catch (err) {
        console.log(err)
    }
})

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})


