const url = 'http://192.168.1.95:3245';

export class Api {
    static async getTodos() {
        const response = await fetch(`${url}/todos`);
        return response.json();
    }
    
    static async addTodo(todo) {
        const response = await fetch(`${url}/addtodos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        return response.json();
    }
    
    static async deleteTodoById(id) {
        const response = await fetch(`${url}/delete/${id}`, {
            method: 'DELETE'
        });
        return response.json();
    }

    static async updateTodoById(id, todo) {
        const response = await fetch(`${url}/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        });
        return response.json();
    }

    static async doneTodoById(id) {
        const response = await fetch(`${url}/done/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.json();
    }

}