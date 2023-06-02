import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ShowList from './component/ShowList';
import ShowSummary from './component/ShowSummary';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    //Setting up the route
    <Router>     
        <Routes>
          <Route exact path="/" element={<ShowList/>} />
          <Route path="/shows/:id" element={<ShowSummary/>} />
        </Routes>
    </Router>
  );
};
const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App />);