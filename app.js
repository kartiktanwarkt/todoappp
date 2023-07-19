const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const { v4: uuidv4 } = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let todos = [];

app.get('/gettodo', (req, res, next) => {
  res.send(todos);
});

app.post('/addtodo', (req, res) => {
  const { name } = req.body;
  console.log(name);
  todos.push({
    id: uuidv4(),
    name
  });
  res.redirect('/gettodo');
});

app.post('/deletetodo', (req, res) => {
  const { id } = req.body;
  todos = todos.filter((task) => task.id !== id);
  res.redirect('/gettodo');
});

app.get('/increasepriority', (req, res) => {
  const { id } = req.query;
  const index = todos.findIndex((task) => task.id === id);
  if (index > 0) {
    const temp = todos[index];
    todos[index] = todos[index - 1];
    todos[index - 1] = temp;
  }
  res.redirect('/gettodo');
});

app.get('/decreasepriority', (req, res) => {
  const { id } = req.query;
  const index = todos.findIndex((task) => task.id === id);
  if (index < todos.length - 1) {
    const temp = todos[index];
    todos[index] = todos[index + 1];
    todos[index + 1] = temp;
  }
  res.redirect('/gettodo');
});

app.listen(PORT, () => {
  console.log('http://localhost:' + PORT);
});
