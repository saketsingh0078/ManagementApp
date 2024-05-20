const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 1234;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/signup', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const userSchema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  email: { type: String, unique: true, required: true },
  password: String,
});

const taskSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  task: String,
});

const User = mongoose.model('User', userSchema);
const Task = mongoose.model('Task', taskSchema);

app.post('/api/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = new User({ firstname, lastname, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error saving user:', err);
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.json(user);
    } else {
      res.status(400).json('Error: Invalid email or password');
    }
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

app.post('/api/tasks', async (req, res) => {
  const { userId, task } = req.body;
  const newTask = new Task({ userId, task });
  try {
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

app.get('/api/tasks/:userId', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.params.userId });
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(400).json('Error: ' + error);
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, { task: req.body.task }, { new: true });
    console.log(updatedTask);
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json('Task deleted.');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
