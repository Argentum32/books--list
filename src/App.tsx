import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import Dashboard from './Dashboard'
import AddBook from './AddBook'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <header>
          <NavLink className='header-btn' to='/'>Dashboard</NavLink>
          <NavLink className='header-btn' to='/book/new'>Add new book</NavLink>
        </header>
        <Switch>
            <Route path="/book/:id">
              <AddBook />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
