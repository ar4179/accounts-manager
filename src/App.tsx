import "./App.css";
import React from "react";
import "./assets/index.css";
import "./assets/icons.css";
import axios from "axios";
import { useState } from "react";

import Collapsibles from "./components/Collapsibles";

function App() {
    const [accounts, setAccounts] = useState([]);

    async function fetchAccounts() {
        const response = await axios.get(
            process.env.REACT_APP_DB_URL + "api/v1/accounts"
        );

        setAccounts(response.data.data.accountsWithTasks);
    }
    fetchAccounts();

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
                    <Collapsibles accounts={accounts} />
                </div>
                <div className="col-2"></div>
            </div>
        </div>
    );
}

export default App;
