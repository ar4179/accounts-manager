import './App.css';
import React from "react";
import "./assets/index.css";
import "./assets/icons.css";

import Account from "./models/Account"
import Task from "./models/Task"
import Collapsibles from './components/Collapsibles';

function App() {

  const accounts = [new Account('Apple Inc.', [new Task("Slap all the execs 1v1 basketball","They're getting cooked","high",25),
                                                new Task("Buy 51% of their shares","I'm gonna be CEO","high",25)]),
                    new Account('Netflix', [new Task("Hack into system","Steal all the user watch data","high",25),
                                              new Task("Make the best movie ever","Starring Lebron Raymone James","high",25)])]

  return (
    <div>
    <Collapsibles accounts={accounts} />
    </div>
  );
}

export default App;
