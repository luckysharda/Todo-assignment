import React, { useEffect, useState } from "react";
import Section from "./Section"; // Import the Section component
import Task from "./Task"; // Import the Task component (in case it's used directly within this file later)

const ListTasks = ({ tasks, setTasks }) => {
  // State hooks to hold tasks filtered by status
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);

  // useEffect hook to filter tasks based on their status
  useEffect(() => {
    const fTodos = tasks.filter((task) => task.status === "todo");
    const fInProgress = tasks.filter((task) => task.status === "inprogress");
    const fClosed = tasks.filter((task) => task.status === "closed");
    setTodos(fTodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]); // Dependency array includes tasks, so this runs whenever tasks change

  // Array of status objects to map over for rendering Sections
  const statuses = [
    { status: "todo", tasks: todos },
    { status: "inprogress", tasks: inProgress },
    { status: "closed", tasks: closed },
  ];

  return (
    <div className="flex gap-8">
      {/* Map over statuses array to render a Section for each status */}
      {statuses.map(({ status, tasks }) => (
        <Section
          key={status} // Unique key for each section
          status={status} // Pass the status to the Section
          tasks={tasks} // Pass the filtered tasks to the Section
          setTasks={setTasks} // Pass setTasks to allow updating the tasks
        />
      ))}
    </div>
  );
};

export default ListTasks;
