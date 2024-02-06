import { useEffect, useState } from "react";
import { Api } from "../config/api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    Api.getTodos()
      .then((response) => {
        setTodos(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDone = async (e) => {
    await Api.doneTodoById(e).then((response) => {
      console.log(response);
    });

    location.reload();
  };

  const handleDelete = async (e) => {
    await Api.deleteTodoById(e).then((response) => {
      console.log(response);
    });

    location.reload();
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>Todo List</h2>

          {todos.length === 0
            ? "No tienes tareas, crea una"
            : todos.map((todo) => (
                <div className="d-flex flex-row" key={todo.id}>
                  {todo.done === false ? (
                    <div className="p-3">
                      <input
                        type="checkbox"
                        onChange={() => handleDone(todo.id)}
                        style={{ border: 3 }}
                      />
                    </div>
                  ) : (
                    <div className="p-3">
                      <input type="checkbox" disabled />
                    </div>
                  )}
                  <div
                    className="p-3"
                    style={{ listStyle: "none", textAlign: "initial" }}
                  >
                    <p>
                      {todo.label} - {todo.id} -{" "}
                      {todo.done === true ? "Done" : "Pending"}
                    </p>
                  </div>
                  <div className="p-3">
                    <button
                      className="p-3"
                      type="button"
                      onClick={() => handleDelete(todo.id)}
                    >
                      delete
                    </button>
                    <button className="p-3" type="button">
                      edit
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
