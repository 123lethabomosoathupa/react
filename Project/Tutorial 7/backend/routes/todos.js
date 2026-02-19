const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// GET ALL TODOS for logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user._id }).sort({ createdAt: -1 });
    const formatted = todos.map((todo) => ({
      todoId:    todo._id,
      title:     todo.title,
      body:      todo.body,
      createdAt: todo.createdAt,
    }));
    return res.json(formatted);
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// CREATE TODO
router.post('/todo', auth, async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({ title: 'Must not be empty' });
    }
    if (!body || body.trim() === '') {
      return res.status(400).json({ body: 'Must not be empty' });
    }

    const todo = await Todo.create({
      title,
      body,
      userId:   req.user._id,
      username: req.user.username,
    });

    return res.json({
      todoId:    todo._id,
      title:     todo.title,
      body:      todo.body,
      createdAt: todo.createdAt,
    });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// DELETE TODO
router.delete('/todo/:todoId', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await todo.deleteOne();
    return res.json({ message: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// EDIT TODO
router.put('/todo/:todoId', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.todoId);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });

    if (todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const { title, body } = req.body;
    if (title) todo.title = title;
    if (body) todo.body = body;
    await todo.save();

    return res.json({ message: 'Updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;