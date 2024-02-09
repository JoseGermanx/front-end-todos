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
        
        const handleCreate = async (description, done) => {
            if (description === "") {
                document.getElementById("descriptionHelp").innerHTML = "La tarea no puede estar vacía";
                return;            
            }
            const data = {
                label: description,
                done: done
            };
          await Api.addTodo(data)
          
          location.reload();
        }

        const handleKeyDown = async (e) => {
            //e.keyCode === 13 || 
            if (e.type === "click") {
                await handleCreate(description, done);
            }
        }

  return (
    <>
        <div className="container m-3">
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
                    onKeyDown={(e) => handleKeyDown(e)}
                    />
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
                <button type="button" className="btn btn-secondary" onClick={(e) => handleKeyDown(e)}>
                    Create
                </button>
                <p><span id="descriptionHelp" className="form-text text-danger"></span></p>
                </form>
            </div>
            </div>
        </div>
    </>
  )
}

export default CreateToDo