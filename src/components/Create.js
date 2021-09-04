import React from 'react'
import {FaRegFileImage, FaRegGrinAlt, FaVideo} from 'react-icons/fa'

function Create() {
    return (
        <div className="create">
            <div className="create__first">
                <div className="create__first-img">
                    <span><img src="./images/one.png"/></span>
                    
                </div>
                <div className="create__first-input">
                    <input type='text'  className="create__first-inputs" placeholder="What's in your mind?"/>
                </div>
            </div>
            <div className="create__second">
                <span className="create__second-icon">
                    <FaVideo className='redcolor'/> <span className="text">Live Video</span>
                </span>
                <span className="create__second-icon">
                    <FaRegFileImage className='greencolor'/> <span className="text">Photo / Video</span>
                </span>
                <span className="create__second-icon">
                    <FaRegGrinAlt className='orangecolor'/> <span className="text">Feeling</span>
                </span>

            </div>
        </div>
    )
}

export default Create
