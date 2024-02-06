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
          Api.addTodo(data)
        }

  return (
    <>
        <div className="container">
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
                    placeholder="Enter description"
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