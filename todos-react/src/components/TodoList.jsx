import { useEffect, useState } from "react";
import { Api } from "../config/api";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [allDone, setAllDone] = useState(false);

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
          <span>{
            allDone === true && <p>Felicitaciones, All Done!!</p>
            }</span>

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
                    <p className="align-midle">
                      {todo.label} - {todo.id} -{" "}
                      {todo.done === true ? "Done" : "Pending"}
                    </p>
                  </div>
                  <div className="p-3">
                    <button
                      className="h-100 bg-danger text-white"
                      type="button"
                      onClick={() => handleDelete(todo.id)}
                    >
                      delete
                    </button>
                    <button className="h-100 bg-warning text-white" type="button">
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
