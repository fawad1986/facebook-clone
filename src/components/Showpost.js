import React,{useState,useEffect} from 'react';
import { FaRegCommentAlt, FaRegThumbsUp, FaShareAlt } from 'react-icons/fa';
import sendRequest from '../util/requestFactory';
import genericResponse from '../server/responses/genericResponse';
import genericError from '../server/responses/errors/genericError';
import SignInReq from '../server/requests/signInRequest';
import ShowPostRequest from '../server/requests/showPostRequest';
import { connect } from 'react-redux';
import actions from '../redux/actions/action'
import {sendShowPostRequest} from '../util/requestDispatcher'


function Showpost(props) {

    const [state2, setState2] = useState( () => props.posts);
    
        useEffect(
            () =>{
               
                handleShowPost(showPostRequest);
            }
            
        ,[]);
        

          let pState = props.parentState;
          pState.email= props.parentState.UserName;
          let showPostRequest = new SignInReq();
          showPostRequest.setEmail(pState.email);
            

          async function handleShowPost(showPostRequest){
            let res = await sendShowPostRequest(showPostRequest);
            
           switch(res.status){
               case '200':
                   //setState2(res.data);
                   props.showpost(res.data);
                   setState2(res.data);
           }
        //handle others scenerios
 

           
            
        }



    
    return (
        <div className="show">
            {state2.map(post => (
            <div key={post.user_id} className="post__container">
            <div className="show__header">
                <div className="show__header-img">
                    <img src={post.profile_pic} alt='mosque'/>
                </div>
                <div className="show__header-name">
                    {post.first_name}
                    <div className='date'>{post.post_date}</div>
                </div>
            </div>
            <div className="show__body">
                <div className='show__body-text'>
                    {post.post_text}
                </div>
                <div className='show__body-img'>
                    <img src={post.content_value}/>
                </div>
            </div>
            <div className='show__reactions'>
                <span className='reactions'>
                <FaRegThumbsUp/><span className='reactions-text'>Like</span>
                </span>
                <span className='reactions'>
                <FaRegCommentAlt/><span className='reactions-text'>Comments</span>
                </span>
                <span className='reactions'>
                <FaShareAlt/><span className='reactions-text'>Share</span>
                </span>
            </div>
            </div>
            ))}
            
        </div>
        )
}



const mapStateToProps = (state) => {
    return {posts : (state.ShowPosts ? state.ShowPosts : [{
        "user_id": "",
        "content_value": "",
        "post_text":"",
        "post_date": ""
    }])
  };
}
  
  const mapDispatchToProps = (dispatch) => {
    return {

      showpost : showRequest => dispatch(actions.showPost(showRequest))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Showpost);

//export default Showpost
