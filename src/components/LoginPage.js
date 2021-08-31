import React from 'react'

function LoginPage() {
    return (
        <div className="login-page">
            <form className='login-container'>
                <input className="login-input" type="email" placeholder="Email Address or Phone Number" />
                <input className="login-input" type='password' placeholder="Password" />
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
