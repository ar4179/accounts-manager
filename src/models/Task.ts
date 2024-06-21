class Task {
    id: string;
    title: string;
    description: string;
    priority: string;
    percentComplete: number;

    constructor(
        title: string,
        description: string,
        priority: string,
        percentComplete: number
    ) {
        this.id = new Date().toISOString();
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.percentComplete = percentComplete;
    }
}

export default Task;
