import React,{useState} from 'react'
import { FaRegCommentAlt, FaRegThumbsUp, FaShareAlt } from 'react-icons/fa'

function Showpost() {
    const [state, setstate] = useState([
        {id:1, userImg:"./images/two.png", 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit, nisi at consectetur convallis, orci velit vehicula dolor, at mattis lorem augue quis dolor. Nullam id dignissim eros, fringilla posuere nibh.',
        postImg:'./images/one.png',userName:'Syed Ammad Hassan',postTime:'21h'},
        {id:2, userImg:"./images/one.png", 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit, nisi at consectetur convallis, orci velit vehicula dolor, at mattis lorem augue quis dolor. Nullam id dignissim eros, fringilla posuere nibh.',
        postImg:'./images/two.png',userName:'Asad Naveed',postTime:'18h'},
        {id:3, userImg:"./images/three.jpg", 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit, nisi at consectetur convallis, orci velit vehicula dolor, at mattis lorem augue quis dolor. Nullam id dignissim eros, fringilla posuere nibh.',
        postImg:'./images/one.png',userName:'Syed Fawad Hassan',postTime:'14h'},
        {id:4, userImg:"./images/two.png", 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit, nisi at consectetur convallis, orci velit vehicula dolor, at mattis lorem augue quis dolor. Nullam id dignissim eros, fringilla posuere nibh.',
        postImg:'./images/three.jpg',userName:'Syed Ammad Hassan',postTime:'21h'},
        {id:5, userImg:"./images/one.png", 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit, nisi at consectetur convallis, orci velit vehicula dolor, at mattis lorem augue quis dolor. Nullam id dignissim eros, fringilla posuere nibh.',
        postImg:'./images/one.png',userName:'Asad Naveed',postTime:'18h'},
        {id:6, userImg:"./images/three.jpg", 
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec suscipit, nisi at consectetur convallis, orci velit vehicula dolor, at mattis lorem augue quis dolor. Nullam id dignissim eros, fringilla posuere nibh.',
        postImg:'./images/two.png',userName:'Syed Fawad Hassan',postTime:'14h'}
    ])
    return (
        <div className="show">
            {state.map(post => (
            <div key={post.id} className="post__container">
            <div className="show__header">
                <div className="show__header-img">
                    <img src={post.userImg} />
                </div>
                <div className="show__header-name">
                    {post.userName}
                    <div className='date'>{post.postTime}</div>
                </div>
            </div>
            <div className="show__body">
                <div className='show__body-text'>
                    {post.text}
                </div>
                <div className='show__body-img'>
                    <img src={post.postImg}/>
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
