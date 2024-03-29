import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaRegEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

function App() {
  // States :
  const [todo, setTodo] = useState(""); // Input text
  const [todos, setTodos] = useState([]); // Holds all the Todo's in Arrays Format
  const [finished, setFinished] = useState(true)

  const toggleFinished = (e) => { 
    setFinished(!finished)
   }

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  

  const saveToLS = (params) => { 
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
    // console.log(todo);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todos);
    saveToLS();
  };

  const handleCheckbox = (e) => {
    // console.log(e, e.target.name)
    let id = e.target.name; // id of individual todo
    // console.log(id)
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    // console.log(index)
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    console.log(newTodos, todos);
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLS();
  };

  const handleDelete = (e, id) => {
    confirm("Are you sure, You want to delete this item?");
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  return  (
    <>
      <Navbar />
      <div className="container mx-auto my-5 bg-violet-200 rounded-xl p-5 min-h-[80vh] w-11/12 md:w-8/12">

        <h1 className="text-center font-bold text-3xl">CheckList Champion - Manage your todo's at one place</h1>

        <div className="addTodo my-2 flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Add a Todo</h2>

          <input
            onChange={handleChange}
            value={todo}
            className="w-full rounded-md py-1 border-none"
            type="text"
          />

          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-500 hover:bg-violet-700 p-3 py-2 text-sm font-semibold text-white rounded-md disabled:cursor-not-allowed"
          >
            Save
          </button>

        </div>    

        <input type="checkbox" checked={finished} onChange={toggleFinished}/>Show Finished Todo's

        <h2 className="text-lg font-semibold">Your Todo's</h2>
        {todos.length === 0 ? (
          <div className="text-center font-bold text-3xl mt-48">
            No Todo's To Display
          </div>) : ("")  
        }

        <div className="todos">
          {todos.map((item) => {
            return (finished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between my-3">
                <div className="flex gap-4 max-w-4xl">
                  <input
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    name={item.id}
                  />

                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="buttons flex gap-1 h-full">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    className="bg-violet-500 hover:bg-violet-700 p-2 py-1 text-xl font-semibold text-white rounded-md"
                  >
                    <FaRegEdit />
                  </button>

                  <button
                    onClick={(e) => {
                      handleDelete(e, item.id);
                    }}
                    className="bg-violet-500 hover:bg-violet-700 p-2 py-1 text-xl font-semibold text-white rounded-md"
                  >
                    <FaDeleteLeft />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
