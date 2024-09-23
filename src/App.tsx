import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import DataEntryForm from './components/DataEntryForm';
import WorkerManagement from './components/WorkerManagement';
import PatientManagement from './pages/PatientManagement';
import PatientDetailsPage from './pages/PatientDetailsPage';
import NavBar from './components/NavBar';
import { AuthProvider } from './context/AuthContext';
import { PatientProvider } from './context/PatientContext';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PatientProvider>
        <Router>
          <div>
            <NavBar />
            <Switch>
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/data-entry" component={DataEntryForm} />
              <Route path="/workers" component={WorkerManagement} />
              <Route path="/patients" component={PatientManagement} />
              <Route path="/patient/:id" component={PatientDetailsPage} />
              <Redirect from="/" to="/login" />
            </Switch>
          </div>
        </Router>
      </PatientProvider>
    </AuthProvider>
  );
};

export default App;