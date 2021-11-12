import { produceWithPatches } from '@reduxjs/toolkit/node_modules/immer';
import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux';
import actions from '../redux/actions/action';
import {sendUserProfileRequest} from '../util/requestDispatcher';
import SignInReq from '../server/requests/signInRequest';
import { FaPlus} from 'react-icons/fa';
import Showpost from './Showpost';
import Create from './Create';
import Navbar from './Navbar'

function Profile(props) {
    const [state,setState] = useState({posts:
        [{
            "profile_pic": "",
            "gender": "",
            "first_name":"",
            "last_name":"",
            "date_of_birth": ""
        }]}
    );
    useEffect(()=> {
        handleUserProfile(userProfileRequest);
        
    }, []);

    let userProfileRequest = new SignInReq();
    userProfileRequest.setEmail(props.email);
    async function handleUserProfile(userProfileRequest){
        let res = await sendUserProfileRequest(userProfileRequest);
        
       switch(res.status){
           case '200':
               props.userprofile(res.data);
               setState({ posts:res.data})
               console.log(res.data);            
       }
    }
   

    return (
        
        <div className='main-profile'>
            <Navbar/>
            <div className='profile-body'>
                <div className='profile_banner'>
                    <img src={props.posts[0].profile_pic} />
                </div>
                <div className="profile__info">
                    <div className="sidebar__list-name">
                    <h2>{props.posts[0].first_name} {props.posts[0].last_name}</h2>
                    </div>
                    
                </div>
                <div className='profile__options'>
                    <p>Posts</p>
                    <p>About</p>
                    <p>Friends</p>
                    <p>Photos</p>
                    <p>Story Archive</p>
                    <p>More</p>
                    <button className="profile__button"><FaPlus/>Add Story</button>
                    <button className="profile__button-edit">Edit Profile</button>

                </div>
            </div>
            <div className="components">
            <Create/>
            <Showpost/>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => {
    return {email : (state.App.UserName ? state.App.UserName : ''),posts : (state.UserProfile ? state.UserProfile : [{
        "profile_pic": "",
        "gender": "",
        "first_name":"",
        "last_name":"",
        "date_of_birth": ""
    }])
  };
}
  
  const mapDispatchToProps = (dispatch) => {
    return {

      userprofile : userProfileRequest => dispatch(actions.userProfile(userProfileRequest))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile);


//export default Profile
