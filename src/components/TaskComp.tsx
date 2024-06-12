import React from 'react';
import Task from "../models/Task";

const TaskComp: React.FC<{task: Task}> = (props) => {
    return (
        <div>
            {props.task.title}
        </div>
    );
}

export default TaskComp;
