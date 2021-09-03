import React  from 'react'

function Sidebar(props) {
  
    return (
        <div className='sidebar'>
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
