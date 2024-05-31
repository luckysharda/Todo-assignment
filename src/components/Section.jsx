import React from "react";
import { useDrop } from "react-dnd";
import Task from "./Task";
import toast from "react-hot-toast";

const Section = ({ status, tasks, setTasks }) => {
  // Setting up the drop functionality
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  // Function to add a task to this section
  const addItemToSection = (id) => {
    setTasks((prev) => {
      const updatedTasks = prev.map((t) => {
        if (t.id === id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast("Task status changed", { icon: "🚀" });
      return updatedTasks;
    });
  };

  // Determine the section's text and background color based on the status
  let text = "Todo";
  let bg = "bg-slate-500";

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-yellow-500";
  } else if (status === "closed") {
    text = "Done";
    bg = "bg-green-500";
  }

  return (
    <div
      ref={drop}
      className={`w-64 h-96 rounded-lg p-4 shadow-lg overflow-y-auto ${
        isOver ? "bg-slate-200" : "bg-gradient-to-r from-gray-100 to-gray-300"
      } transition-colors duration-300 ease-in-out`}
    >
      {/* Render the section header */}
      <Header text={text} bg={bg} count={tasks.length} />
      {/* Render the tasks within this section */}
      {tasks.length > 0 &&
        tasks.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

// Component to render the header of each section
const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center h-12 pl-4 rounded-lg uppercase text-sm text-white shadow-md mb-4`}
    >
      {text}
      <div className="ml-2 bg-white w-6 h-6 text-black rounded-full flex items-center justify-center shadow-inner">
        {count}
      </div>
    </div>
  );
};

export default Section;
