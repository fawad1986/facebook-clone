import React, {useState} from 'react';
import SignUpReq from '../server/requests/signUpRequest';
import sendRequest from '../util/requestFactory';
import genericResponse from '../server/responses/genericResponse';
import genericError from '../server/responses/errors/genericError';

function SignupPage(props) {
    const [stateObj, setStateObj] = useState({
        first_name:'',
        last_name:'',
        Email:'',
        Password:'',
        birthDay:'',
        birthMonth:'',
        birthYear:'',
        gender:''
    });
    function handleChange(e){
        setStateObj({...stateObj, [e.target.name]: e.target.value}) 
    }
    function handleSubmit(e){
        e.preventDefault();
        let signUpRequest = new SignUpReq;
        signUpRequest.setFirstName(stateObj.first_name);
        signUpRequest.setLastName(stateObj.last_name);
        signUpRequest.setEmail(stateObj.Email);
        signUpRequest.setPassword(stateObj.Password);
        signUpRequest.setBirthDay(stateObj.birthDay);
        signUpRequest.setBirthMonth(stateObj.birthMonth);
        signUpRequest.setBirthYear(stateObj.birthYear);
        signUpRequest.setGender(stateObj.gender);
        console.log(signUpRequest);
        validateFromApi('http://localhost:5001/newuser',signUpRequest,'POST').then(response => response.json()).then(response => {
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
                    pState.Route = '/';
                    props.parentCallback(pState);  
                 break;
             }
        }).catch(error => console.log(error));
    }

const validateFromApi= async(url='', data='', reqMethod) => {
    return sendRequest(url,data,reqMethod)
}

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <p>It's quick and easy</p>
            <hr/>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder="First name" className="firstname" name="first_name" value={stateObj.first_name} onChange={handleChange}/>
                <input type='text' placeholder="Surname" className="lastname" name="last_name" value={stateObj.last_name} onChange={handleChange}/>
                <input type='text' placeholder="Mobile number or email address" name="Email" value={stateObj.Email} className="email-address" onChange={handleChange}/>
                <input type='password' placeholder="New Password" className="email-address" name="Password" value={stateObj.Password} onChange={handleChange}/>

                <label className="date-of-birth">Date of Birth</label>
                <select  aria-label="Day" name="birthDay" value={stateObj.birthDay} onChange={handleChange} id="day" title="Day" className="date-field"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24" selected="1">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option></select>
                <select aria-label="Month" name="birthMonth" value={stateObj.birthMonth} onChange={handleChange} id="month" title="Month" className="date-field"><option value="1">Jan</option><option value="2">Feb</option><option value="3">Mar</option><option value="4">Apr</option><option value="5">May</option><option value="6">Jun</option><option value="7">Jul</option><option value="8" selected="1">Aug</option><option value="9">Sep</option><option value="10">Oct</option><option value="11">Nov</option><option value="12">Dec</option></select>
                <select aria-label="Year" name="birthYear" value={stateObj.birthYear} onChange={handleChange} id="year" title="Year" className="date-field"><option value="2004">2004</option><option value="2005">2005</option><option value="2006">2006</option><option value="2007">2007</option><option value="2008">2008</option><option value="2009">2009</option><option value="2010">2010</option><option value="2011">2011</option><option value="2012">2012</option><option value="2013">2013</option><option value="2014">2014</option><option value="2015">2015</option><option value="2016">2016</option><option value="2017">2017</option><option value="2018">2018</option><option value="2019">2019</option><option value="2020">2020</option><option value="2021">2021</option></select>
                <select aria-label = 'Gender'name="gender" value={stateObj.gender} onChange={handleChange}><option  value="m">Male</option><option  value="f">Female</option></select>
                <p>By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                <button>Sign Up</button>
            
            </form>
            
        </div>
    )
}

export default SignupPage
