import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [tasks, setTasks] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("tasks");
    if (todoString) {
      let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
      setTasks(savedTasks);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTasks([...tasks, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");

    saveToLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = tasks.findIndex((item) => {
      return item.id === id;
    });

    console.log(index);
    let newTasks = [...tasks];
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
    setTasks(newTasks);
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = tasks.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTasks = tasks.filter((item) => {
      return item.id !== id;
    });
    setTasks(newTasks);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      console.log("Item deleted!");

      let newTasks = tasks.filter((item) => {
        return item.id !== id;
      });
      setTasks(newTasks);
    }
    saveToLS();
  };

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="md:container bg-blue-200 md:w-3/5 mx-auto p-5 mt-10 rounded-2xl">
        <div className="addTask">
          <h1 className="text-center text-3xl p-4 text-blue-500 font-bold underline">Managing tasks is the best way to be productive</h1>
          <h1 className="text-2xl mb-4 font-bold text-blue-500">
            Add Your Task
          </h1>
          <input
            onChange={handleChange}
            value={todo}
            className="p-2 bg-white outline-none rounded-lg w-1/2"
            type="text"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-400 hover:bg-blue-500 p-2 rounded-lg text-white mx-4"
            disabled={todo.length <= 3}
          >
            SAVE
          </button>
        </div>
        <input
          type="checkbox"
          onChange={toggleFinished}
          checked={showFinished}
          className="mt-5 mr-2"
        />
        Show finished
        <hr className="text-blue-400 mt-4"/>
        <h1 className="text-2xl my-4 font-bold text-blue-500">Your Tasks:</h1>
        <div className="TaskList flex flex-col gap-5">
          {tasks.length === 0 && (
            <div className="mx-auto">No Task added yet !!</div>
          )}
          {tasks.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="task flex items-center justify-between"
                >
                  <div className="flex">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      checked={item.isCompleted}
                      type="checkbox"
                      id=""
                    />
                    <div
                      className={`text mx-4 bg-white p-2 rounded-lg ${
                        item.isCompleted ? "line-through" : ""
                      }`}
                    >
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex items-center gap-2 whitespace-nowrap">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="mx-2 bg-blue-400 hover:bg-blue-500 p-2 rounded-lg text-white font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="mx-2 bg-red-400 hover:bg-red-500 p-2 rounded-lg text-white font-bold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
