class Task {
    id: string;
    title: string;
    description: string;

    constructor(title: string, description: string) {
        this.id = new Date().toISOString();
        this.title = title;
        this.description = description;
    }
}

export default Task