import React,{useState,useEffect} from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';

function Timeline(props) {
    let stateObject = {sideBar:[]}

    
    const fetchDataFromApi = () =>
    {

        //Get data from Api here
        let fakeUserData = {
            sideBar: [{id:1, image:'/images/one.png', name: 'UI-UX' },
            {id:2, image:'/images/two.png', name: 'SEO' },
            {id:3, image:'/images/three.png', name: 'Web Development' },
            {id:4, image:'/images/four.png', name: 'Call Center Solutions' },
            {id:5, image:'/images/five.png', name: 'Branding' },
            {id:6, image:'/images/six.png', name: 'Software Development' } ]
    
        };
        return fakeUserData;
        

    }
    const [UserData,setUserData] = useState(stateObject);
    useEffect(()=>{

        setUserData(fetchDataFromApi());

    },[]);

    return (
        <div>
            <Navbar />
      <div className="facebook">
        <Sidebar data={UserData.sideBar}/>
      </div>
        </div>
    )
}

export default Timeline
