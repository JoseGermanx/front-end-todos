import { useEffect, useState } from "react";
import { Api } from "../config/api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    Api.getTodos().then((response) => {
      setTodos(response);
    });
  }, [todos]);

  const handleDone = (e) => {
    Api.doneTodoById(e).then((response) => {
      console.log(response);
    });

    Api.getTodos().then((response) => {
      setTodos(response);
    });
  };

  const handleDelete = (e) => {
    Api.deleteTodoById(e).then((response) => {
      console.log(response);
    });

    Api.getTodos().then((response) => {
      setTodos(response);
    });
  }


  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h2>Todo List</h2>
          <ul>
            {todos.map((todo) => (
              <div className="row" key={todo.id}>
                {todo.done === false ? (
                  <input type="checkbox" onChange={() => handleDone(todo.id)} style={{border:"green"}} />
                ) : (
                  <input type="checkbox" disabled />
                )}
                <li style={{ listStyle: "none", textJustify: "initial" }}>
                  <p>
                    {todo.label} - {todo.id}
                  </p>
                  {todo.done === true ? " - Done" : "Pending"}
                </li>
                <button type="button" onClick={()=> handleDelete(todo.id)}>delete</button>
                <button>edit</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
