import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Splashscreen from './Component/Splashscreen.jsx';
import SignUp from './Component/SignUp.jsx';
import Login from './Component/Login.jsx';
import HomeScreen from './Component/HomeScreen.jsx';
import Type from './Component/type.jsx';
import './transitions.css';   
import MiddleWare from './Component/MiddleWare.jsx';
import MiddleWare2 from './Component/MiddleWare2.jsx';
import AdminDashboard from './Component/AdminDashboard.jsx';
import AddDriver from './Component/AddDriver.jsx';
import AddBus from './Component/AddBus.jsx';
import DashBoard from './Component/DashBoard.jsx';
import AllDriver from './Component/AllDriver.jsx';
import DriverDashbroad from './Component/DriverDashbroad.jsx';
import { Provider } from 'react-redux';
import store from '../Store/Store.js';
import AllBuses from './Component/AllBuses.jsx';

const App = () => (
  <Router>
    <TransitionGroup>
      <CSSTransition
        timeout={300}
        classNames="fade"
        unmountOnExit
      >
        <Routes>
          <Route path="/" element={<Splashscreen />} />
          <Route path="SignUp/:type" element={<SignUp />} />
          <Route path="LogIn" element={<Login />} />
          <Route path="driverDashbroad" element={<DriverDashbroad />} />
          <Route path="Home" element={<HomeScreen />} />
          <Route path="type" element={<Type />} />
          <Route path="middle" element={<MiddleWare/>}/>
          <Route path="middleAuth" element={<MiddleWare2/>}/>
          <Route path="admin" element={<AdminDashboard/>}>
            <Route index element={<DashBoard/>}/>
            <Route path="driver" element={<AddDriver/>}/>
            <Route path="allDrivers" element={<AllDriver/>}/>
            <Route path="Bus" element={<AddBus/>}/>
            <Route path="Buses" element= {<AllBuses/>}/>
          </Route>
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);
