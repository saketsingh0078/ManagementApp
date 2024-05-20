import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = ({ user }) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:1234/api/tasks/${user._id}`)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to fetch tasks. Please try again later.');
      });
  }, [user._id]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim()) {
      if (isEditing) {
        axios
          .put(`http://localhost:1234/api/tasks/${currentTaskId}`, { task })
          .then((res) => {
            setTodos(
              todos.map((t) => (t._id === currentTaskId ? res.data : t))
            );
            setTask("");
            setIsEditing(false);
            setCurrentTaskId(null);
          })
          .catch((err) => console.log(err));
      } else {
        axios
          .post("http://localhost:1234/api/tasks", { userId: user._id, task })
          .then((res) => {
            setTodos([...todos, res.data]);
            setTask("");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleEditTask = (id, task) => {
    setTask(task);
    setIsEditing(true);
    setCurrentTaskId(id);
  };

  const handleDeleteTask = (id) => {
    axios
      .delete(`http://localhost:1234/api/tasks/${id}`)
      .then(() => {
        setTodos(todos.filter((t) => t._id !== id));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-400 text-white py-4">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl">
            Welcome, {user ? user.firstname : "User"}!
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <h2 className="text-2xl mb-4 text-yellow-100">To-Do List</h2>
        <form onSubmit={handleAddTask} className="mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter a task"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            {isEditing ? "Update Task" : "Add Task"}
          </button>
        </form>
        <ul className="list-disc pl-5">
          {todos.map((todo, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              {todo.task}
              <div>
                <button
                  onClick={() => handleEditTask(todo._id, todo.task)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(todo._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Dashboard;
