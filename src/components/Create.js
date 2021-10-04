import React,{useState,useRef} from 'react'
import {FaRegFileImage, FaRegGrinAlt, FaVideo} from 'react-icons/fa';
import sendRequest from '../util/requestFactory';
import genericResponse from '../server/responses/genericResponse';
import genericError from '../server/responses/errors/genericError';
import creatPostRequest from '../server/requests/createPostRequest';

function Create(props) {
    // let obj = {
    //     "post_text":'',
    //     "content_value":''
    // };
    const inputRef = useRef(null);
    const [state,setState] = useState({
        "post_text":'',
        "content_value":''
    });
   
    const toggleForm=()=> {
        let toggle = document.getElementById('toggle-form');
        if(toggle.style.display === 'none'){
            toggle.style.display ='block';
        } else{
            toggle.style.display = 'none'
        }
    }

    function handleChange(e){
        setState(
            {
                ...state,
                [e.target.name]:e.target.value
            }
        );
        e.preventDefault();
    }

    function handleTypeChange(e){
        setState(
            {
                ...state,
                "type":e.target.innerHTML
            }
        );
        e.preventDefault();
    }

    function handleSubmit(e){
        postDataToApi(state);
        inputRef.current.value='';
    }
    const validateFromApi = async (url = '', data = {}, reqMethod) =>{
        return sendRequest(url,data,reqMethod);
      }

      let pState = props.parentState;
      pState.email = props.parentState.Email;
      let createPost = new creatPostRequest();
        createPost.setEmail(pState.email);
        createPost.setPostText(state.post_text);
        createPost.setContentValue(state.content_value)


    function postDataToApi(data){
        //Implement APi Call here
        validateFromApi(`http://localhost:5005/CreateTimelineData`,createPost,'POST').then(response => response.json()).then(response => {
            console.log(response);
            if(response.status === '200'){
                setState(response.data);
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
        <div className="create">
            <div className="create__first">
                <div className="create__first-img">
                    <span><img src="./images/one.png"/></span>
                    
                </div>
                <div className="create__first-input">
                    <input type='text'  className="create__first-inputs" placeholder="What's in your mind?" name="post_text" value={state.post_text} onChange={handleChange} ref={inputRef}/>
                </div>
            </div>
            <div className="create__second">
                <span className="create__second-icon">
                    <FaVideo className='redcolor'/> <span className="text" name="type2" onClick={handleTypeChange}>Live Video</span>
                </span>
                <span className="create__second-icon">
                    <FaRegFileImage className='greencolor'/> <button className="text pbutton" name="type2"  onClick={toggleForm}>Photo / Video</button>
                  
                    <form id='toggle-form'>
                        <input type='text' id='imagesInput' name='content_value' placeholder='Paste your URL here' value={state.content_value} onChange={handleChange}></input>
                    </form>
                    
                </span>
                <span className="create__second-icon">
                    <FaRegGrinAlt className='orangecolor'/> <button className="text" onClick={handleSubmit}>Post</button>
                </span>

            </div>
        </div>
    )
}

export default Create
