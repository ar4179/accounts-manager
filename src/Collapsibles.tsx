import React from 'react';
import Collapsible from "./Collapsible";
import Account from './models/Account';

// input a list of accounts and ouput collapsible for each one

const Collapsibles: React.FC<{accounts: Account[]}> = (props) => {
    return (
        <div>
            {props.accounts.map((account) => (
                <Collapsible header={account.name}> <ul> {account.tasks.map((task) => (<li>{task.title}</li>))} </ul> </Collapsible>
            ))}
        </div>
    );
}

export default Collapsibles