import React,{useState,useRef} from 'react'
import {FaRegFileImage, FaRegGrinAlt, FaVideo} from 'react-icons/fa'

function Create() {
    let obj = {
        "text":'',
        'type':''
    };
    const inputRef = useRef(null);
    const [state,setState] = useState(obj);

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

    function postDataToApi(data){
        //Implement APi Call here

    }

    return (
        <div className="create">
            <div className="create__first">
                <div className="create__first-img">
                    <span><img src="./images/one.png"/></span>
                    
                </div>
                <div className="create__first-input">
                    <input type='text'  className="create__first-inputs" placeholder="What's in your mind?" name="text" onChange={handleChange} ref={inputRef}/>
                </div>
            </div>
            <div className="create__second">
                <span className="create__second-icon">
                    <FaVideo className='redcolor'/> <span className="text" name="type2" onClick={handleTypeChange}>Live Video</span>
                </span>
                <span className="create__second-icon">
                    <FaRegFileImage className='greencolor'/> <span className="text" name="type2"  onClick={handleTypeChange}>Photo / Video</span>
                </span>
                <span className="create__second-icon">
                    <FaRegGrinAlt className='orangecolor'/> <button className="text" onClick={handleSubmit}>Post</button>
                </span>

            </div>
        </div>
    )
}

export default Create
