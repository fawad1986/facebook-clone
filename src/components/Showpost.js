import React,{useState,useEffect} from 'react';
import { FaRegCommentAlt, FaRegThumbsUp, FaShareAlt } from 'react-icons/fa';
import ShowPost_req from '../server/requests/showPostRequest';
import sendRequest from '../util/requestFactory';

function Showpost() {

    const [state2, setState2] = useState( () => [{
        "user_id": "",
        "content_value": "",
        "post_text":"",
        "post_date": ""
    }]);
    
        useEffect(
            () =>{
               // fetch('http://localhost:5004/showposts').then(response => response.json()).then(data => setState(data)).catch(err => console.log(err));

               fetchDataFromApi();
            }
            
        ,[]);
        const validateFromApi = async (url = '', data = {}, reqMethod) =>{
            return sendRequest(url,data,reqMethod);
          }

   const fetchDataFromApi =  () =>{

      /*  let showPostRequest = new ShowPost_req();
        showPostRequest.setUser_id(state2.user_id);
        showPostRequest.setContent_value(state2.content_value);
        showPostRequest.setPost_text(state2.post_text);
        showPostRequest.setPost_date(state2.post_date);
        console.log('show post request')
        console.log(showPostRequest);
        */
        validateFromApi(`http://localhost:5004/showposts`,{} ,'GET').then(response => response.json()).then(data => {
            console.log('Data Recieved from API to react---');
            console.log(data);
            if(data.status == '200'){
                setState2(data.data);
            }


        }).catch(err => console.log(err));
    
    }

    
    return (
        <div className="show">
            {state2.map(post => (
            <div key={post.user_id} className="post__container">
            <div className="show__header">
                <div className="show__header-img">
                    <img src={post.content_value} alt='mosque'/>
                </div>
                <div className="show__header-name">
                    {post.user_id}
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
