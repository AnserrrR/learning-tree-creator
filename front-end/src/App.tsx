import React from 'react';
import Flow from './components/Flow/Flow';
import { ReactFlowProvider } from 'reactflow';
import { ApolloProvider } from '@apollo/client';
import client from './api/apollo-client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AppLayout from './layout/AppLayout';
import { AuthProvider } from './context/AuthContext';
import AuthDialogs from './components/Auth/AuthDialogs';


import './App.css';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ReactFlowProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path={'/login'} element={<AuthDialogs />} />
              <Route path={'/register'} element={<AuthDialogs />} />
              <Route path={'/'} element={<ProtectedRoute />} >
                <Route element={<AppLayout />}>
                  <Route path={'tree/:treeId'} element={<Flow />} />
                  {/*<UserTreesCatalog/>*/}
                  {/*<AllTreesCatalog></AllTreesCatalog>*/}
                  {/*<AuthDialogs></AuthDialogs>*/}
                  {/*<SectionDialog></SectionDialog>*/}
                  {/*<AuthDialogs></AuthDialogs>*/}
                  {/*<AllTreesCatalog></AllTreesCatalog>*/}
                </Route>
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
      </ReactFlowProvider>
    </ApolloProvider>
  );
};

export default App;
