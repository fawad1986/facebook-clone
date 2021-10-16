import React,{useState,useRef} from 'react'
import {FaRegFileImage, FaRegGrinAlt, FaVideo} from 'react-icons/fa';
import creatPostRequest from '../server/requests/createPostRequest';
import { connect } from 'react-redux';
import actions from '../redux/actions/action';
import {sendCreatePostRequest} from '../util/requestDispatcher';
import SignInReq from '../server/requests/signInRequest';
import {sendShowPostRequest} from '../util/requestDispatcher'

function Create(props) {

    const inputRef = useRef(null);
    const [state,setState] = useState({email:'',post_text:'',content_value:'',type:''});
   
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
        handleCreatePostRequest(createPost);
        inputRef.current.value='';
    }

      let createPost = new creatPostRequest();
        createPost.setEmail(props.email);
        createPost.setPostText(state.post_text);
        createPost.setContentValue(state.content_value)
        
        let showPostRequest = new SignInReq();
        showPostRequest.setEmail(props.email);


    async function handleCreatePostRequest(createpost){
        let response =  await sendCreatePostRequest(createpost);
        let resFromShowPost = await sendShowPostRequest(showPostRequest);
        console.log(response)
            let createReq = {};
            createReq.post_text = state.post_text
            createReq.content_value = state.content_value
            switch(response.status){
                case '200':
                    props.showpost(resFromShowPost.data);
                    setState({email:'',post_text:'',content_value:'',type:''});
                    //To Do : clear frm values
            }
                
               
        
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

const mapStateToProps = (state) => {
    return {email : (state.App.UserName ? state.App.UserName : '')
  };
}
  
  const mapDispatchToProps = (dispatch) => {
    return {

    showpost : showRequest => dispatch(actions.showPost(showRequest))
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Create);

//export default Create
