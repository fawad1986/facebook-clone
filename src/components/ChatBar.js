import React,{useState,useEffect} from 'react'

function ChatBar(props) {
    
    const fetchDataFromApi = () =>
    {

        //Get data from Api here
        let fakeUserData = {
            chatbar: [{id:1, image:'/images/one.png', name: 'UI-UX' },
            {id:2, image:'/images/two.png', name: 'SEO' },
            {id:3, image:'/images/three.jpg', name: 'Web Development' },
            {id:4, image:'/images/four.png', name: 'Call Center Solutions' },
            {id:5, image:'/images/five.png', name: 'Branding' },
            {id:6, image:'/images/six.jpg', name: 'Software Development' } ]
    
        };
        return fakeUserData;
        

    }
    const [state,setState]= useState({chatbar:[]});


    useEffect(
        ()=>{
            let data = fetchDataFromApi();
            setState(data);
        },[]
    );




    return (
        <div className="chatbar">
            {state.chatbar.map(chat => (
            <div className="chatbar__list">
                <div className="chatbar__list-img">
                    <img src={chat.image} />
                    <span className="status"></span>
                </div>
                <div className="chatbar__list-name">{chat.name}</div>
            </div>
            ))}
        </div>
    )
}

export default ChatBar
