import { produceWithPatches } from '@reduxjs/toolkit/node_modules/immer';
import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux';
import actions from '../redux/actions/action';
import {sendUserProfileRequest} from '../util/requestDispatcher';
import SignInReq from '../server/requests/signInRequest';

function Profile(props) {
    const [state,setState] = useState({posts:
        [{
            "profile_pic": "",
            "gender": "",
            "first_name":"",
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
            
            <div className='profile-body'>
                <div className='sidebar__list-img'>
                    <img src={props.posts[0].profile_pic} />
                </div>
                <div className="sidebar__list-name">
                  Name:  {props.posts[0].first_name}
                </div>
                <div className="sidebar__list-name">
                    Date of Birth: {props.posts[0].date_of_birth}
                </div>
                <div className="sidebar__list-name">
                    Gender:{props.posts[0].gender}
                </div>

            </div>
                    
        </div>
    )
}


const mapStateToProps = (state) => {
    return {email : (state.App.UserName ? state.App.UserName : ''),posts : (state.UserProfile ? state.UserProfile : [{
        "profile_pic": "",
        "gender": "",
        "first_name":"",
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
