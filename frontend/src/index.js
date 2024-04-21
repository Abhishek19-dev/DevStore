import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import store from "./Redux/Store"
import {BrowserRouter as Router} from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import { ProjectFilterProvider } from './components/context/useContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
  <React.StrictMode>

    <Provider store = {store}>
    <Router>
      <ProjectFilterProvider>
       <App  />
    </ProjectFilterProvider>
    </Router>

    </Provider>
    
  </React.StrictMode>
  </ChakraProvider>
);

