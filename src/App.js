import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { withRouter } from 'react-router-dom';
import Index from './components/Core'

const App = () => {
  return (
    <Index />
  );
}

export default withRouter(App)
