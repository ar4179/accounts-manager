import React from "react";

import Collapsible from "./Collapsible";
import Account from "../models/Account";
import TaskComps from "./TaskComps";

// input a list of accounts and ouput collapsible for each one

// make TasksComp component to style each task
// <TasksComp tasks={account.task} />

// inside TasksComp function do another map that maps each task item to <TaskComp title={task.title} />

const Collapsibles: React.FC<{ accounts: Account[] }> = (props) => {
    return (
        <div>
            {props.accounts.map((account) => (
                <Collapsible header={account.name}>
                    {" "}
                    <TaskComps tasks={account.tasks} />{" "}
                </Collapsible>
            ))}
        </div>
    );
};

export default Collapsibles;
