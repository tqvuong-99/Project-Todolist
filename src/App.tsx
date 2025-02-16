import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { v4 as uuidv4 } from "uuid";
import { Plus, Calendar } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

interface Task {
  id: string;
  text: string;
  deadline: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [cookies, setCookie] = useCookies(["tasks"]);

  useEffect(() => {
    if (cookies.tasks) {
      setTasks(cookies.tasks);
    }
  }, [cookies]);

  const handleAddTask = () => {
    if (newTask.trim() === "") return;
    const updatedTasks = [
      ...tasks,
      {
        id: uuidv4(),
        text: newTask,
        deadline: newTaskDeadline,
        completed: false,
      },
    ];
    setTasks(updatedTasks);
    setCookie("tasks", updatedTasks, { path: "/" });
    setNewTask("");
    setNewTaskDeadline("");
    setShowForm(false);
  };

  const handleToggleComplete = (id: string) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    setCookie("tasks", updatedTasks, { path: "/" });
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 px-25 py-10 bg-sky-100">
        <Header />

        {/* Nhấn New Task */}
        <button
          onClick={() => setShowForm(true)}
          className="flex bg-sky-700 text-white font-medium px-6 py-1 rounded-2xl"
        >
          <Plus className="px-1" /> New Task
        </button>

        {/* Hiển thị form tạo task */}
        {showForm && (
          <div className="mt-4 flex gap-4 ml-20">
            <div className=" flex flex-col gap-4">
              <input
                type="text"
                className=" border border-gray-400 px-6 py-1 rounded-3xl w-64"
                placeholder="Enter a new task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
              <input
                type="date"
                className="border border-gray-400 px-6 py-1 rounded-3xl w-64"
                value={newTaskDeadline}
                onChange={(e) => setNewTaskDeadline(e.target.value)}
              />
            </div>
            <button
              onClick={handleAddTask}
              className="h-[34px] bg-sky-700 text-white font-medium px-5 py-1 rounded-2xl"
            >
              Add Task
            </button>
          </div>
        )}

        {/* Danh sách Task chưa thực hiện */}
        <ul className="mt-5">
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <li
                key={task.id}
                className="flex justify-between my-4 p-4 border border-gray-400 rounded-2xl my-2 bg-sky-200 shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div className=" flex gap-2 text-base font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                    {task.text}
                  </div>
                </div>
                <div className="flex items-center border border-hidden bg-white rounded-2xl px-2 py-1 text-sm text-gray-700">
                  <Calendar className="text-gray-500 font text-xs p-1" />
                  Deadline: {task.deadline}
                </div>
              </li>
            ))}
        </ul>

        {/* Danh sách Task đã thực hiện */}
        <ul className="mt-3">
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <li
                key={task.id}
                className="flex flex-col gap-2 p-4 border border-gray-400 rounded-2xl my-2 bg-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div className=" flex gap-2 text-sm line-through text-gray-500">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleComplete(task.id)}
                    />
                    {task.text}
                  </div>
                </div>
              </li>
            ))}
        </ul>
      </main>
    </div>
  );
};

export default App;
