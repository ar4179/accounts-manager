import Task from "./Task";

class Account {
    id: string;
    name: string;
    tasks: Task[];

    constructor(name: string, tasks: Task[]) {
        this.id = new Date().toISOString();
        this.name = name;
        this.tasks = tasks;
    }
}

export default Account;
