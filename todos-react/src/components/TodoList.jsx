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
    <div className="container mt-4">
      <div className="row">
        <div className="col-4">
          <CreateToDo />
        </div>
        <div className="col-8">
          {todos.length === 0 ? <p className="alert alert-warning">No hay tareas</p>:
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Done</th>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={todo.done}
                      onChange={() => handleDone(todo.id)}
                    />
                  </td>
                  <td>{todo.label}</td>
                  <td>{todo.done ? "Completada" : "Incompleta"}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>}
          <span>{todos.length !== 0 ? null : <p className="alert alert-warning">Cargando....</p>}</span>
          <span>
            {allDone === true ? (
              <p className="alert alert-success">Congrast, your done!</p>
            ) : (
              todoPending === true && (
                <p className="alert alert-warning">Tienes tareas pendientes</p>
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
