import React from 'react'
import Stories from './Stories.js'
import Create from './Create.js'
import Showpost from './Showpost.js'

function Posts(props) {
    return (
        <div className="posts">
            <Stories/>
            <Create />
            <Showpost/>
        </div>
    )
}

export default Posts
