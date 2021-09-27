import React , { useState} from 'react';
import SignInReq from '../server/requests/signInRequest';
import sendRequest from '../util/requestFactory';
import genericResponse from '../server/responses/genericResponse';
import genericError from '../server/responses/errors/genericError';

function LoginPage(props) {
    const [stateObj, setStateObj] = useState( {"Email":'',"Password":''} );
    const[ hasError, setHasError] = useState(false);
    function handleChange(e){
        setStateObj({...stateObj, [e.target.name] : e.target.value});
    }

    function handleSubmit(e){
        console.log('A name was submitted: ' + stateObj.Email);
        console.log('A phone was submitted: ' + stateObj.Password);
        e.preventDefault();
        let signInRequest = new SignInReq();
        signInRequest.setEmail(stateObj.Email);
        signInRequest.setPassword (stateObj.Password);
        console.log(signInRequest);
        validateFromApi(`http://localhost:5000/usersignin`,signInRequest,'POST').then(response =>response.json()
        ).then(response =>{
            console.log("--Recieved data from API");
             console.log(response);
             let error;
             switch(response.status){
                 case '503':
                        //log the error
                        error = new genericError();
                        error.setStatus(response.status);
                        error.setError(response.error);
                     throw error;
                case '404':
                     error = new genericError();
                        error.setStatus(response.status);
                        error.setError(response.error);
                    throw error;
                case '200':
                    let resp = new genericResponse();
                    resp.setStatus(response.status);
                    resp.setData(response.data);
                    //Code for going to next widget
                    let pState = props.parentState;
                    pState.Email = stateObj.Email;
                    pState.LoginStatus = 'Success';
                    pState.Route = 'Main';
                    props.parentCallback(pState);  
                 break;
             }


         }).catch(error => {
             setHasError(true);
             console.log(error);
             //Code to display the error to user
            });

            /*
         if (signInRequest.Email === "example@example.com" && signInRequest.Password === "abc123"){
            return true;
        }
        */

        // todo
        /*
        let pState = props.parentState;
        pState.Email = stateObj.Email;
        pState.LoginStatus = 'Success';
        pState.Route = 'Main';
        props.parentCallback(pState);   */
        return false;
    }

    const validateFromApi = async (url = '', data = {}, reqMethod) =>{
      return sendRequest(url,data,reqMethod);
    }
    return (
        <div className="login-page">
            <form className='login-container' onSubmit={handleSubmit}>
                <input className="login-input" value={stateObj.Email} type="email" placeholder="Email Address or Phone Number"  name="Email" onChange={handleChange}/>
                <input className="login-input" value={stateObj.Password} type='password' placeholder="Password" name="Password" onChange={handleChange}/>
                {hasError === true && <p className = "error-msg">Email or Password Incorrect</p>}
                <button className="login-btn">Log In</button>
                <a href="#" className="login-a">Forgotten Password ?</a>
                <div className="hr  "></div>
                <button className="Create-btn">Create Account</button>
            </form>
            <p className="login-p"><strong>Create a page</strong> for celebrity, band or business.</p>
        </div>
    )
}

export default LoginPage
