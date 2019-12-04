import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/NavbarComponent'
import Dashboard from './components/dashboard/Dashboard'
import ProjectDetails from './components/projects/ProjectDetails'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import CreateProgram from "./components/programs/CreateProgram";
import ProgramDetails from "./components/programs/ProgramDetails";
import UpdateRoles from "./components/auth/ManageUsers";
import ProfileDetails from "./components/profile/ProfileDetails";
import TemplateComponent from "./components/template/TemplateComponent";
import Apply from "./components/applications/Apply";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path='/'component={Dashboard} />
            <Route path='/project/:id' component={ProjectDetails} />
            <Route exact path='/program/:id' component={ProgramDetails} />
            <Route exact path='/program/:id/apply' component={Apply} />
            {/*<Route path='/application/:id' component={} />*/}

            <Route path='/signin' component={SignIn} />
            <Route path='/signup' component={SignUp} />
            <Route path='/roles/edit' component={UpdateRoles} />

            <Route path='/profile' component={ProfileDetails} />

            <Route path='/createprogram' component={CreateProgram} />


            <Route path='/templatetesting' component={TemplateComponent}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
