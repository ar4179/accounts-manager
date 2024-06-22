import React from "react";

import Collapsible from "./Collapsible";
import TaskComps from "./TaskComps";

// input a list of accounts and ouput collapsible for each one

// make TasksComp component to style each task
// <TasksComp tasks={account.task} />

// inside TasksComp function do another map that maps each task item to <TaskComp title={task.title} />

const Collapsibles: React.FC<{ accounts: any[] }> = (props) => {
    return (
        <div>
            {props.accounts.map((account) => (
                <Collapsible key={account._id} header={account.name}>
                    {" "}
                    <TaskComps
                        key={account._id}
                        tasks={account.tasks}
                        account_id={account._id}
                    />{" "}
                </Collapsible>
            ))}
        </div>
    );
};

export default Collapsibles;
