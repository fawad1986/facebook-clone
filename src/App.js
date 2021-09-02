
import './App.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import React , { useState } from 'react';

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
          <SignupPage />
          </div>
        )
        break;

      case 'Main':
        return (
        <div>
          <p><b>Welcome</b></p>
        </div>
        )
        break;
    }
  
  }
}



export default App;
