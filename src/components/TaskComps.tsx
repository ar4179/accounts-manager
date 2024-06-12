import React from "react";
import Task from "../models/Task"
import TaskComp from "./TaskComp"

const TaskComps: React.FC<{tasks: Task[]}> = (props) => {
    return (
        <div>
            {props.tasks.map((task) => (<TaskComp task={task} />))}
        </div>
    );
}

export default TaskComps;