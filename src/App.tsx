import "./App.css";
import React from "react";
import "./assets/index.css";
import "./assets/icons.css";
import axios from "axios";
import { useState, useEffect } from "react";

import Collapsibles from "./components/Collapsibles";

function App() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        async function fetchAccounts() {
            const response = await axios.get(
                process.env.REACT_APP_DB_URL + "api/v1/accounts"
            );

            setAccounts(response.data.data.accountsWithTasks);
        }
        fetchAccounts();
    }, []);

    return (
        <div>
            <Collapsibles accounts={accounts} />
        </div>
    );
}

export default App;
