import React , { useState } from 'react';

function LoginPage(props) {
    const [stateObj, setStateObj] = useState( {"Email":'',"Password":''} );

    function handleChange(e){
        setStateObj({...stateObj, [e.target.name] : e.target.value});
    }

    function handleSubmit(e){
        if (validateFromApi(stateObj)){
            let pState = props.parentState;
            pState.Email = stateObj.Email;
            pState.LoginStatus = 'Success';
            pState.Route = 'Main';
            props.parentCallback(pState);   
        }
        e.preventDefault();
    }

    function validateFromApi(data){
        // To Do: Make Api call, for now its mock data

        if (data.Email == "example@example.com" && data.Password == "abc123"){
            return true;
        }
        return false;
    }

    return (
        <div className="login-page">
            <form className='login-container' onSubmit={handleSubmit}>
                <input className="login-input" type="email" placeholder="Email Address or Phone Number"  name="Email" onChange={handleChange}/>
                <input className="login-input" type='password' placeholder="Password" name="Password" onChange={handleChange}/>
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
