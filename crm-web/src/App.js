import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import { store } from './Redux/Store'; // Import the Redux store
import Home from './pages/Home'; // Landing page component
import Investment from './pages/Investment'; //Donation Page
import LoginPage from './pages/Login';
import AuthWrapper from './components/AuthWrapper';


function App() {
    return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route element={<AuthWrapper />}>
              <Route path="/" element={<Home />} />
              <Route path="/investment" element={<Investment />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
      </Provider>
    );
  }

export default App;