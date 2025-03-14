import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Register from './components/Auth/Register';
import Wallet from './components/Wallet/Wallet';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Common/Header';
import Footer from './components/Common/Footer';
import PrivateRoute from './services/PrivateRoute';
import Payments from './pages/Payments';
import Notifications from './pages/Notofications';
import Profile from './pages/profile';
import HelpAndSupport from './pages/helpAndSupport';
import Alerts from './components/PayBills/Alerts';
import UserOverview from './components/Dashboard/UserOverview'
import ViewAlerts from './components/PayBills/ViewAlerts';

function App() {
  const location = useLocation();

  // Define paths where the header should not be displayed
  const noHeaderPaths = ['/login', '/register'];

  return (
    <div>
      {/* Conditionally render the header */}
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <main style={{ minHeight: '80vh', padding: '20px' }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/wallet"
            element={
              <PrivateRoute>
                <Wallet />
              </PrivateRoute>
            }
          />



        <Route
            path="/Payments"
            element={
              <PrivateRoute>
                <Payments />
              </PrivateRoute>
            }
          />



                    <Route
            path="/Notifications"
            element={
              <PrivateRoute>
                <Notifications />
              </PrivateRoute>
            }
          />


                    <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />


                   <Route
            path="/ViewAlerts"
            element={
              <PrivateRoute>
                <ViewAlerts/>
              </PrivateRoute>
            }
          />


               <Route
            path="/Support"
            element={
              <PrivateRoute>
                <HelpAndSupport />
              </PrivateRoute>
            }
          />



                  <Route
            path="/Alerts"
            element={
              <PrivateRoute>
                <Alerts />
              </PrivateRoute>
            }


            



            
          />


   <Route path="/UserOverview" element={ <PrivateRoute> <UserOverview name={'true'}  age= {24}/></PrivateRoute>}/></Routes> 


      </main>
      <Footer />
    </div>
  );
}

// Wrap the App component with Router
const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;