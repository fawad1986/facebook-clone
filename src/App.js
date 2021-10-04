
import './App.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import React , { useState } from 'react';

import Timeline from './components/Timeline'

function App() {

  const [stateObj, setStateObj] = useState( {"LoginStatus":'','UserName':'','Route':'/'} );

  const changeGlobalState = (newState) =>{
    setStateObj({...newState});
    console.log("State Changed");
  }

  return (
    <div className="App">
      {returnComponentBasedOnRoute(stateObj.Route)}
      
    </div> 
  );

  function returnComponentBasedOnRoute(route){

    switch (route){
      case '/':
        return (
          <div>
          <LoginPage parentCallback = {changeGlobalState} parentState = {stateObj}/>
          <SignupPage parentCallback={changeGlobalState} parentState = {stateObj}/>
          </div>
        )
        break;

      case 'Main':
        return (
        <Timeline parentState = {stateObj}/>
        )
        break;
    }
  
  }
}



export default App;
