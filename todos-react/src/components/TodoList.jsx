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
        <div className="col-4">
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
        </div>
        <div className="col-8">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                todos.map((todo) => (
                  <tr key={todo.id}>
                    <td>{todo.label}</td>
                    <td>{todo.label}</td>
                    <td>{todo.label}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
