
const CreateToDo = () => {
  return (
    <>
        <div className="container">
            <div className="row">
            <div className="col-12">
                <h2>Create a new Todo</h2>
                <form>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <input
                    type="text"
                    className="form-control"
                    id="description"
                    aria-describedby="descriptionHelp"
                    placeholder="Enter description"
                    />
                    <small id="descriptionHelp" className="form-text text-muted">
                    Describe the task to do
                    </small>
                </div>
                <div className="form-group form-check">
                    <input
                    type="checkbox"
                    className="form-check-input"
                    id="done"
                    />
                    <label className="form-check-label" htmlFor="done">
                    Done
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">
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