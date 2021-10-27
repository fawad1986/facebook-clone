import React,{useState,useEffect} from 'react'
import {sendSearchFriendsRequest} from '../util/requestDispatcher'
import SignInReq from '../server/requests/signInRequest';
import { connect } from 'react-redux';
import actions from '../redux/actions/action'

function ChatBar(props) {
    
    const [state,setState]= useState([{"profile_pic": "","first_name":""}]);


    useEffect(
        ()=>{
            fetchDataFromApi(searchFriendsRequest);
            
        },[]
    );


    let searchFriendsRequest = new SignInReq();
    searchFriendsRequest.setEmail(props.id);

    async function fetchDataFromApi (searchFriendsRequest) {

       let res = await sendSearchFriendsRequest(searchFriendsRequest)
        switch(res.status){
            case '200':
                
                setState(res.data);            
        }

    }
    




    return (
        <div className="chatbar">
            {state.map(friend => (
            <div className="chatbar__list">
                <div className="chatbar__list-img">
                    <img src={friend.profile_pic} />
                    <span className="status"></span>
                </div>
                <div className="chatbar__list-name">{friend.first_name}</div>
            </div>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {id : (state.App.id ? state.App.id : '')
  };
}
  
//   const mapDispatchToProps = (dispatch) => {
//     return {

//         userprofile : userProfileRequest => dispatch(actions.userProfile(userProfileRequest))
//     }
//   };
  
  export default connect(mapStateToProps, null)(ChatBar);

//export default ChatBar
