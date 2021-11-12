
import './App.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import React , { useState,useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { connect } from 'react-redux';
import Profile from './components/Profile';
import Timeline from './components/Timeline'
import {BrowserRouter as Router, Route,Switch,Redirect} from 'react-router-dom';

function App(prop) {

  const [stateObj, setStateObj] = useState( {"LoginStatus":prop.LoginStatus,'UserName':prop.UserName,'Route':prop.Route} );
  
  useEffect(() => {
    setStateObj({"LoginStatus":prop.LoginStatus,'UserName':prop.UserName,'Route':prop.Route});
  },[prop.LoginStatus]);

  const changeGlobalState = (newState) =>{
    setStateObj({...newState});
    console.log("State Changed");
  }

  return (
    
    // <div className="App">
    //   {returnComponentBasedOnRoute(stateObj.Route)}
      
    // </div> 

    <Router>
      <Switch>
        <Route exact path='/'><LoginPage parentCallback = {changeGlobalState} parentState = {stateObj}/></Route>
        <Route exact path='/timeline'><Timeline/></Route>
        <Route exact path='/profile'><Profile/></Route>
      </Switch>
    </Router>
    
  );

  // function returnComponentBasedOnRoute(route){

  //   switch (route){
  //     case '/':
  //       return (
  //         <div>
  //         <LoginPage parentCallback = {changeGlobalState} parentState = {stateObj}/>
  //         <SignupPage parentCallback={changeGlobalState} parentState = {stateObj}/>
  //         </div>
  //       )
  //       break;

  //     case 'Main':
  //       return (
  //       /*<Timeline/>*/
  //       <Profile/>
  //       )
  //       break;
  //   }
  
  // }
}

const mapStateToProps = (state, ownProps) => {
  return {"LoginStatus":(state ? state.App.LoginStatus : ''),'UserName':(state ? state.App.UserName : ''),'Route':(state ? state.App.Route : '/'), 'id':(state ? state.App.id : '')}
};

export default connect(mapStateToProps)(App);
