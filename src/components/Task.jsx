import React, { useState } from "react";
import { useDrag } from "react-dnd";
import toast from "react-hot-toast";

const Task = ({ task, tasks, setTasks }) => {
  // If the task is undefined, return null to avoid rendering
  if (!task) {
    return null;
  }

  // Setting up the drag functionality
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // States for editing the task
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
  });

  // Function to handle the removal of a task
  const handleRemove = (id) => {
    const filteredTasks = tasks.filter((t) => t.id !== id);
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    setTasks(filteredTasks);
    toast("Task removed", { icon: "🙄" });
  };

  // Function to handle the edit mode
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to save the edited task
  const handleSave = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((t) =>
        t.id === id
          ? {
              ...t,
              title: editedTask.title,
              description: editedTask.description,
            }
          : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    setIsEditing(false);
    toast.success("Task updated successfully");
  };

  // Function to change the status of a task
  const handleStatusChange = (id, newStatus) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: newStatus,
              timestamp:
                newStatus === "closed" ? new Date().toISOString() : t.timestamp,
            }
          : t
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return updatedTasks;
    });
    toast.success(`Task moved to ${newStatus}`);
  };

  return (
    <div
      ref={drag}
      className={`relative p-4 mt-4 shadow-md rounded-lg bg-gradient-to-r from-blue-100 via-white to-blue-100 ${
        isDragging ? "opacity-50" : "opacity-100"
      } cursor-grab transition-opacity duration-300 ease-in-out max-w-full`}
      style={{ overflow: "hidden" }}
    >
      {isEditing ? (
        <>
          {/* Input for editing the task title */}
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          {/* Textarea for editing the task description */}
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="border border-gray-300 rounded-md p-2 w-full mt-2"
          />
          <div className="flex justify-end mt-2 space-x-2">
            {/* Save button */}
            <button
              className="text-green-600 hover:text-green-800 transition-colors duration-300 ease-in-out"
              onClick={() => handleSave(task.id)}
            >
              Save
            </button>
            {/* Cancel button */}
            <button
              className="text-red-600 hover:text-red-800 transition-colors duration-300 ease-in-out"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Display the task title */}
          <h3 className="font-bold truncate">{task.title}</h3>
          {/* Display the task description if it exists */}
          {task.description && (
            <p className="mt-1 truncate">{task.description}</p>
          )}
          {/* Display the timestamp if the task is closed */}
          {task.status === "closed" && (
            <p className="mt-2 text-xs text-gray-500">
              Done at: {new Date(task.timestamp).toLocaleString()}
            </p>
          )}
          <div className="absolute bottom-1 right-1 flex flex-col items-end space-y-2">
            <div className="flex space-x-2">
              {/* Edit button */}
              <button
                className="text-slate-400 hover:text-slate-600 transition-colors duration-300 ease-in-out"
                onClick={handleEdit}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 3.487a2.25 2.25 0 0 1 3.182 3.182l-12 12a2.25 2.25 0 0 1-1.01.564l-3 1a.75.75 0 0 1-.948-.948l1-3a2.25 2.25 0 0 1 .564-1.01l12-12zm0 0L13.5 6.75"
                  />
                </svg>
              </button>
              {/* Remove button */}
              <button
                className="text-slate-400 hover:text-slate-600 transition-colors duration-300 ease-in-out"
                onClick={() => handleRemove(task.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>
            {/* Status change buttons */}
            {task.status === "todo" && (
              <button
                className="text-blue-600 hover:text-blue-800 transition-colors duration-300 ease-in-out mt-2"
                onClick={() => handleStatusChange(task.id, "inprogress")}
              >
                Start
              </button>
            )}
            {task.status === "inprogress" && (
              <button
                className="text-green-600 hover:text-green-800 transition-colors duration-300 ease-in-out mt-2"
                onClick={() => handleStatusChange(task.id, "closed")}
              >
                Completed
              </button>
            )}
            {task.status === "closed" && (
              <button
                className="text-red-600 hover:text-red-800 transition-colors duration-300 ease-in-out mt-2"
                onClick={() => handleRemove(task.id)}
              >
                Remove
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Task;
