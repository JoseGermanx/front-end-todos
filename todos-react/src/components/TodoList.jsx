import { useEffect, useState } from "react";
import { Api } from "../config/api";
import CreateToDo from "./CreateToDo";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [allDone, setAllDone] = useState(false);
  const [todoPending, setTodoPending] = useState(false);

  useEffect(() => {
    Api.getTodos()
      .then((response) => {
        setTodos(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      const allDone = todos.every((todo) => todo.done === true);
      setAllDone(allDone);
    }
  }, [todos]);

  useEffect(() => {
    if (todos.length > 0) {
      const todoPending = todos.some((todo) => todo.done === false);
      setTodoPending(todoPending);
    }
  }, [todos]);

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
          <CreateToDo />
          <span>
            {allDone === true ? (
              <p className="alert alert-success">Felicitaciones, All Done!!</p>
            ) : (
              todoPending === true && (
                <p className="alert alert-warning">Tienes tareas pendientes</p>
              )
            )}
          </span>
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
                    style={{
                      listStyle: "none",
                      textAlign: "initial",
                      alignSelf: "center",
                    }}
                  >
                    <p>
                      {todo.label} - {todo.id} -{" "}
                      {todo.done === true ? "✅ Done" : "Pending"}
                    </p>
                  </div>
                  <div className="p-3">
                    <button type="button" onClick={() => handleDelete(todo.id)}>
                      🗑️
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
