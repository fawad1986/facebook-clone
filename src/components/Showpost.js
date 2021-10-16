import React,{useState,useEffect} from 'react';
import { FaRegCommentAlt, FaRegThumbsUp, FaShareAlt } from 'react-icons/fa';
import SignInReq from '../server/requests/signInRequest';
import { connect } from 'react-redux';
import actions from '../redux/actions/action'
import {sendShowPostRequest} from '../util/requestDispatcher'


function Showpost(props) {

    const [state2, setState2] = useState({posts: [{
        "user_id": "",
        "content_value": "",
        "post_text":"",
        "post_date": ""
    }]});


        useEffect(
            () =>{
               
                handleShowPost(showPostRequest);
            }
            
        ,[]);
        

          let showPostRequest = new SignInReq();
          showPostRequest.setEmail(props.email);
            

          async function handleShowPost(showPostRequest){
            let res = await sendShowPostRequest(showPostRequest);
            
           switch(res.status){
               case '200':
                   props.showpost(res.data);
                   setState2({ posts:res.data});            
           }
        //handle others scenerios
 

           
            
        }

    return (
        <div className="show">
            { props.posts.length>0 && props.posts.map(post => (
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
    return {email : (state.App.UserName ? state.App.UserName : ''),posts : (state.ShowPosts ? state.ShowPosts : [{
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
