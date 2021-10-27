import React  from 'react'
import {FaUserFriends,FaGift,FaUsers,FaCaretSquareRight,FaRegClock } from 'react-icons/fa'


function Sidebar(props) {
  
    return (
        <div className='sidebar'>
            <div><FaUserFriends className="sidebar__icons"/><span className="sidebar__text">Friends</span></div>
            <div><FaUsers className="sidebar__icons"/><span className="sidebar__text">Groups</span></div>
            <div><FaCaretSquareRight className="sidebar__icons"/><span className="sidebar__text">Watch</span></div>
            <div><FaGift className="sidebar__icons"/><span className="sidebar__text">Marketplace</span></div>
            <div><FaRegClock className="sidebar__icons"/><span className="sidebar__text">Memories</span></div>
            {props.data.map((info) => (
            <div className='sidebar__list' key={info.id}>
                <div className='sidebar__list-img'>
                    <img src={info.image} alt='facebook image'/>
                </div>
                <div className="sidebar__list-name">{info.name}</div>
            </div>
            ))}
        </div>
    )
}

export default Sidebar
