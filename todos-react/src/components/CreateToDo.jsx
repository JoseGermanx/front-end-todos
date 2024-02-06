import { useState } from 'react';
import { Api } from '../config/api';

const CreateToDo = () => {

        const [description, setDescription] = useState("");
        const [done, setDone] = useState(false);

        const handleDescription = (e) => {
            setDescription(e.target.value);
        }

        const handleDone = (e) => {
            setDone(e.target.checked);
        }
        
        const handleCreate = async (e) => {
            e.preventDefault();
            const data = {
                label: description,
                done: done
            };
          await Api.addTodo(data)
          
          location.reload();
        }

  return (
    <>
        <div className="container text-center m-3">
            <div className="row">
            <div className="col-12">
                <form>
                <div className="form-group">
                    <label htmlFor="description">Agrega una nueva tarea</label>
                    <input
                    type="text"
                    className="form-control"
                    id="description"
                    aria-describedby="descriptionHelp"
                    placeholder="Ingresa la tarea"
                    onChange={(e) => handleDescription(e)}
                    />
                    <small id="descriptionHelp" className="form-text text-muted">
                    ¿Qué tienes que hacer?
                    </small>
                </div>
                <div className="form-group form-check">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    id="done"
                    onChange={(e) => handleDone(e)}
                    />
                    <label className="form-check-label" htmlFor="done">
                    Done
                    </label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e) => handleCreate(e)}>
                    Create
                </button>
                </form>
            </div>
            </div>
        </div>
    </>
  )
}

export default CreateToDo