import {useEffect, useState} from "react";
import "./App.css";
function App(){
  const [todo, setTodo] = useState("");
  const [array, setArray]  = useState(() =>{
  const stored = localStorage.getItem("item");
  return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState("all");



useEffect(() =>{
  console.log("save load");
   localStorage.setItem("item", JSON.stringify(array));
},[array]);

const filteredTask = array.filter((task) => {
  if(filter === "all") return true;
  if(filter === "completed") return task.completed === true;
  if(filter === "active") return !task.completed;

  return true;
})

function submit(){
   if(!todo){ 
    alert("Please Enter a task");
    return
  }

const newTask = {
  id: Date.now(),
  text: todo,
  completed : false,
}
  setArray( [
    ...array,
    newTask
  ]); 
  
  setTodo("");
}

function toggleTask(id){
  const update = array.map(task =>{
        if(task.id === id){
          return{
            ...task, completed: !task.completed
        };
        }
        return task;
      });
      setArray(update);

    } 


function deletTask(id){
    const filtered = array.filter((tasks) => tasks.id !== id);
    setArray(filtered);
}

 return (
  <div className="container">
<h2>TODO LIST</h2>

<section className="input">
    <input
      value={todo}
      onChange={(e) => setTodo(e.target.value)}
    />
 

    <button className="add" onClick={submit}>
      Add
    </button>
</section>
<section className="filter">
     <button onClick={() => setFilter("all")}>All</button>
     <button onClick={() => setFilter("completed")}>Completed</button>
     <button onClick={() => setFilter("active")}>Active</button>
</section>


    {filteredTask.map((task) => (
      <div className="render" key={task.id}>
        <h4 onClick={() => toggleTask(task.id)} style={{textDecoration: task.completed
           ? "line-through" : "none"}}>{task.text}</h4>
      
        <button className="delete" onClick={() => deletTask(task.id)}>
          Delete
        </button>
 
      </div>
    ))} 

     
  </div>
);


}
export default App;