import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask"; // Import CreateTask component
import ListTasks from "./components/ListTasks"; // Import ListTasks component
import { Toaster } from "react-hot-toast"; // Import Toaster for notifications
import { DndProvider } from "react-dnd"; // Import DnDProvider for drag and drop context
import { HTML5Backend } from "react-dnd-html5-backend"; // Import HTML5Backend for drag and drop support

function App() {
  // State hook to manage tasks, initializing with tasks from localStorage if available
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Effect hook to load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks)); // Parse and set tasks from localStorage
      } catch (e) {
        console.error("Error parsing tasks from localStorage", e);
        setTasks([]); // Set tasks to an empty array if parsing fails
      }
    }
  }, []);

  return (
    // DndProvider provides the drag and drop context for the app
    <DndProvider backend={HTML5Backend}>
      {/* Toaster for displaying notifications */}
      <Toaster />
      {/* Main container with a gradient background and flexbox layout */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-screen h-screen flex flex-col items-center pt-10 gap-8">
        {/* App title */}
        <h1 className="text-4xl text-white font-bold mb-4">My Todo's</h1>
        {/* CreateTask component for adding new tasks */}
        <CreateTask tasks={tasks} setTasks={setTasks} />
        {/* ListTasks component for displaying and managing tasks */}
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
