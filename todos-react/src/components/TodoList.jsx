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
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <span>
            {allDone === true ? (
              <div
                className="alert alert-success alert-dismissible fade show"
                role="alert"
              >
                Congrast, your done!
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            ) : (
              todoPending === true && (
                <div
                  className="alert alert-warning alert-dismissible fade show"
                  role="alert"
                >
                  Tienes tareas pendientes
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                  ></button>
                </div>
              )
            )}
          </span>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Actualizar tarea
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputTodo" className="form-label">
                    Tarea
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputTodo"
                    aria-describedby="emailHelp"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
