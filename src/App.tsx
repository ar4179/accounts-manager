import "./App.css";
import React from "react";
import "./assets/index.css";
import "./assets/icons.css";
import axios from "axios";
import { useState, useEffect } from "react";

import Collapsibles from "./components/Collapsibles";

function App() {
    const [accounts, setAccounts] = useState([]);

    const [collapsibleState, setCollapsibleState] = useState(false);

    useEffect(() => {
        async function fetchAccounts() {
            const response = await axios.get(
                process.env.REACT_APP_DB_URL + "api/v1/accounts"
            );

            setAccounts(response.data.data.accountsWithTasks);
        }
        fetchAccounts();
    }, [collapsibleState]);

    return (
        <div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8" id="main-title">
                    <h1>Account Manager</h1>
                </div>
                <div className="col-2"></div>
            </div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8">
                    <Collapsibles
                        accounts={accounts}
                        collapsibleState={collapsibleState}
                        setCollapsibleState={setCollapsibleState}
                    />
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default App;
