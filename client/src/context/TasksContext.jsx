import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createTaskRequest, getTasksRequest } from "../api/tasks.js";

const TaskContext = createContext();

//eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (task) => {
    //setTasks([...tasks, task])

    const res = await createTaskRequest(task);
    console.log(res);
  };

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired, // Puedes utilizar "node" si cualquier tipo de componente React se puede pasar como "children"
};
