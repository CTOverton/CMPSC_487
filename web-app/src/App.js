import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Home from "./components/testbs/Home"
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import createProject from "./components/testbs/CreateProject";

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/signin' component={SignIn} />
              <Route path='/signup' component={SignUp} />
              {/*<Route path='/project/:id' component={ProjectDetails} />*/}
              <Route path='/createProject' component={createProject} />
          </Switch>
        </div>
      </BrowserRouter>
  );
}

export default App;