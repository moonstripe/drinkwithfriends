import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHead from './components/AppHead';
import { WrappedPlaceholder } from './components/PHFrontpage'
import Table from './components/Table';

// import Contact from "./components/pages/Contact";

function App() {
  return (
    <Router>
      <AppHead/>
      <Route path="/game" component={Table}/>
      <Route exact path="/" component={WrappedPlaceholder}/>
    </Router>
  );
}

export default App;
