import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid"; // Importing uuid for unique task IDs

const CreateTask = ({ tasks, setTasks }) => {
  // State hook to manage the task input
  const [task, setTask] = useState({
    id: "",
    title: "",
    description: "",
    status: "todo",
    timestamp: null,
  });

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Validate the task title length
    if (task.title.length < 3) {
      return toast.error(
        "A task must have more than 3 characters in the title"
      );
    }
    if (task.title.length > 100) {
      return toast.error("A task title must have less than 100 characters");
    }
    // Create a new task with a unique ID
    const newTask = { ...task, id: uuidv4() };
    // Update the tasks state with the new task
    setTasks((prev) => {
      if (!Array.isArray(prev)) {
        console.error("Previous state is not an array:", prev);
        return prev;
      }
      const list = [...prev, newTask];
      // Save the updated task list to localStorage
      localStorage.setItem("tasks", JSON.stringify(list));
      return list;
    });
    // Show success notification
    toast.success("Task Created Successfully");
    // Reset the task input state
    setTask({
      id: "",
      title: "",
      description: "",
      status: "todo",
      timestamp: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
      {/* Input field for task title */}
      <input
        type="text"
        placeholder="Title"
        className="border-2 border-slate-400 bg-slate-100 rounded-xl h-12 w-64 px-1"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />
      {/* Textarea for task description */}
      <textarea
        placeholder="Description (optional)"
        className="border-2 border-slate-400 bg-slate-100 rounded-xl h-24 w-64 px-1"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />
      {/* Button to submit the form */}
      <button className="bg-gradient-to-r from-green-400 to-blue-500 rounded-md px-4 h-12 text-white">
        Create
      </button>
    </form>
  );
};

export default CreateTask;
