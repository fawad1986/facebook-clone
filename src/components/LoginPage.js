import React , { useState} from 'react';
import SignInReq from '../server/requests/signInRequest';
import { connect } from 'react-redux';
import actions from '../redux/actions/action'
import {sendLoginRequest} from '../util/requestDispatcher'
import {useHistory} from 'react-router-dom'

function LoginPage(props) {
    const [stateObj, setStateObj] = useState( {"Email":'',"Password":'',"id":''} );
    const[ hasError, setHasError] = useState(false);
    function handleChange(e){
        setStateObj({...stateObj, [e.target.name] : e.target.value});
    }
    const history = useHistory();
    function handleSubmit(e){
        console.log('A name was submitted: ' + stateObj.Email);
        console.log('A phone was submitted: ' + stateObj.Password);
        e.preventDefault();
        let signInRequest = new SignInReq();
        signInRequest.setEmail(stateObj.Email);
        signInRequest.setPassword (stateObj.Password);
        console.log(signInRequest);
        //Came from redux
        handleSendLogin(signInRequest);
        //props.login(signInRequest);
    }

    async function handleSendLogin(req){
        let res = await sendLoginRequest(req);
        // check if error object
        let signInRes = {};
        signInRes.UserName = stateObj.Email;
        signInRes.id = res.data.id;
        props.login(signInRes);
        history.push('/timeline')
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
/*
const mapStateToProps = (state, ownProps) => {
    return {"Email":state.email,"Password":state.password , "id":state.id}
  };
  */
  const mapDispatchToProps = (dispatch) => {
    return {
      login : loginRequest => dispatch(actions.loginUser(loginRequest))
    }
  };
  
  export default connect(null, mapDispatchToProps)(LoginPage);

//export default LoginPage
