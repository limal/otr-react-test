import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Books } from "./books";
import "./bootstrap-custom.scss"; // override Bootstrap theme here
import "./App.scss";

function App() {
  return (
    <Router>
      <div className="App">
        <h3 className="App__Header">Lukasz Wolnik's Greek book search</h3>
        <Switch>
          <Route path={"/:page?"} component={Books} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
