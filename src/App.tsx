import './App.css';
import Collapsible from "./Collapsible";
import React from "react";
import "./assets/index.css";
import "./assets/icons.css";

function App() {
  return (
    <div>
    <Collapsible header="collapse header">
      Consectetur adipiscing elit pellentesque habitant morbi tristique.
      Pulvinar pellentesque habitant morbi tristique. Vel quam elementum
      pulvinar etiam. Pulvinar pellentesque habitant morbi tristique senectus
    </Collapsible>
    <Collapsible header="collapse header">
      Consectetur adipiscing elit pellentesque habitant morbi tristique.
      Pulvinar pellentesque habitant morbi tristique. Vel quam elementum
      pulvinar etiam. Pulvinar pellentesque habitant morbi tristique senectus
    </Collapsible>
    </div>
  );
}

export default App;
