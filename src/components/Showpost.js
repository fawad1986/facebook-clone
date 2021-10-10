import React,{useState,useEffect} from 'react';
import { FaRegCommentAlt, FaRegThumbsUp, FaShareAlt } from 'react-icons/fa';
import sendRequest from '../util/requestFactory';
import genericResponse from '../server/responses/genericResponse';
import genericError from '../server/responses/errors/genericError';
import SignInReq from '../server/requests/signInRequest';

function Showpost(props) {

    const [state2, setState2] = useState( () => [{
        "user_id": "",
        "content_value": "",
        "post_text":"",
        "post_date": ""
    }]);
    
        useEffect(
            () =>{
               
               fetchDataFromApi();
            }
            
        ,[]);
        const validateFromApi = async (url = '', data = {}, reqMethod) =>{
            return sendRequest(url,data,reqMethod);
          }

          let pState = props.parentState;
          pState.email= props.parentState.UserName;
          let signInReq = new SignInReq();
          signInReq.setEmail(pState.email);


   const fetchDataFromApi =  () =>{
        validateFromApi(`http://localhost:5004/showposts`,signInReq,'POST').then(response => response.json()).then(response => {
            console.log(response);
            if(response.status == '200'){
                setState2(response.data);
                let res = new genericResponse();
                res.setStatus(response.status);
                res.setData(response.data);
            }
            if(response.status === '503'){
                let error = new genericError();
                error.setStatus(response.status);
                error.setError(response.error);
                throw error;
            }
            if(response.status === '404'){
                let error = new genericError();
                error.setStatus(response.error);
                error.setError(response.error);
                throw error;
            }

        }).catch(err => console.log(err));
    
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

export default Showpost
