import React, {useState, useEffect} from 'react'
import { FaFacebook,FaSistrix,FaHome,FaUserFriends,FaVideo,FaUsers,FaGamepad, FaPlus, FaFacebookMessenger, FaBell, FaCaretDown} from 'react-icons/fa'
import SignUpReq from '../server/requests/signUpRequest';
import Profile from './Profile.js'
import {searchFriendRequest,addFriendRequest} from '../util/requestDispatcher'
import { connect } from 'react-redux';
import actions from '../redux/actions/action'
import IdReq from '../server/requests/idRequest';
import {Link} from 'react-router-dom'

function Navbar(props) {

    const [state, setState] = useState({"id":"","first_name": "","profile_pic": ""});
   


    function handleChange(e){
        setState({
            ...state,
            [e.target.name] : e.target.value
        });
        
        e.preventDefault();
    }

    function handleSubmit(e){
        let searchFirstName = new SignUpReq();
    searchFirstName.setFirstName(state.first_name);

        handleSearchFriend(searchFirstName);
        e.preventDefault();
    }

    const toggleForm=()=> {
        let toggle = document.getElementById('profile-toggle');
        if(toggle.style.display === 'none'){
            toggle.style.display ='block';
        } else{
            toggle.style.display = 'none'
        }
    }

    function sendFriendRequest(){
        
    let idReq = new IdReq();
    idReq.setCurrentUserId(props.id);
    idReq.setAddFriendId(state[0].id);
        console.log(state[0].id);
    handleaddFriend(idReq);
    }
    
    
    
 async function handleaddFriend(idReq){
    
     let res = await addFriendRequest(idReq);
    
     switch(res.status){
         case '200':
             props.login(idReq)
             console.log(res.data);            
     }
 }


    let searchFirstName = new SignUpReq();
    searchFirstName.setFirstName(state.first_name); 

    async function handleSearchFriend(searchFirstName){
        let res = await searchFriendRequest(searchFirstName);
        switch(res.status){
            case '200':
                
                setState(res.data);
                console.log(res.data);            
        }
    }

    return (
        <div className='navbar'>
            <div className='navbar__first'>
                <div className="navbar__first-logo">
                    <Link to='/timeline'><FaFacebook className="navbar__logo"/></Link>
                </div>
                <div className='navbar__first-search'>
                    <form onSubmit={handleSubmit}>
                    <input type='text' className='navbar__first-searchbar' placeholder="Facebook Search" name='first_name' value={state.first_name} onChange={handleChange} />
                    <button className='navabr__searchbutton' type="submit" value = 'Submit'>Search</button>
                    </form>
                    <FaSistrix className="navabr__searchicon" />
                    {state.length >0 && state.map(post=> (
                    <div className="searchResult">
                        <div className='searchName'>{post.first_name}</div>
                        <div className="sidebar__list-img">                       
                            <img src={post.profile_pic}/>
                        </div>
                        <div><button className='addFriendButton' type='submit' value="Submit" onClick={sendFriendRequest}>Add Friend</button></div>
                    </div>))}
                </div>

            </div>
            <div className='navbar__middle'>
                <span className='middleIcon'>
                    <FaHome className='navbar__middle-icons' />
                </span>
                <span className='middleIcon'>
                    <FaUserFriends className='navbar__middle-icons' />
                </span>
                <span className='middleIcon'>
                    <FaVideo className='navbar__middle-icons' />
                </span>
                <span className='middleIcon'>
                    <FaUsers className='navbar__middle-icons' />
                </span>
                <span className='middleIcon'>
                    <FaGamepad className='navbar__middle-icons' />
                </span>
                
            </div>
            <div className='navbar__last'>
                <span className="navbar__last-section">
                    <Link to='/profile'><FaPlus/></Link>
                  
                </span>
                <span className="navbar__last-section">
                    <FaFacebookMessenger/>
                </span>
                <span className="navbar__last-section">
                    <FaBell/>
                </span>
                <span className="navbar__last-section">
                    <FaCaretDown/>
                </span>
            </div>
        </div>
    )
}



const mapStateToProps = (state) => {
    return {id : (state.App.id ? state.App.id : '')};
}
  
  const mapDispatchToProps = (dispatch) => {
    return {

        login : loginRequest => dispatch(actions.loginUser(loginRequest))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Navbar);

//export default Navbar
