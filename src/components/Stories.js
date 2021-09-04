import React,{useState} from 'react'

function Stories(props) {
    const [state, setstate] = useState([
    {id:1, image:'/images/one.png', name: 'UI-UX' },
    {id:2, image:'/images/two.png', name: 'SEO' },
    {id:3, image:'/images/three.jpg', name: 'Web Development' },
    {id:4, image:'/images/four.png', name: 'Call Center Solutions' },
    {id:5, image:'/images/five.png', name: 'Branding' },
    {id:6, image:'/images/six.jpg', name: 'Software Development' } ])

    return (
        <div className="stories">
            {state.map(story => (
            <div className='stories__col'>
                <div className="stories__body">
                    <img src={story.image}  alt="stories" />
                    <div className='stories__body-overlay'>
                        <div className='stories__body-overlay-img'>
                            <img src={story.image} alt="stories" />
                        </div>
                        <div className="stories__body-name">{story.name}</div>
                    </div>
                </div>
            </div>
            ))}
            
        </div>
    )
}

export default Stories
